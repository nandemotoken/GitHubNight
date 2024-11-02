-- このプログラムにはluasocketが必要です
local socket = require("socket")

-- サーバーの設定
local server = assert(socket.bind("*", 8080))
print("Server listening on port 8080...")

-- シンプルなHTTPレスポンスを生成する関数
local function generate_response(status, content)
    local response = {
        "HTTP/1.1 " .. status,
        "Content-Type: text/html",
        "Content-Length: " .. #content,
        "",
        content
    }
    return table.concat(response, "\r\n")
end

-- ルーティング
local routes = {
    ["/"] = function()
        return "200 OK", "<h1>Welcome to Lua Web Server!</h1>"
    end,
    ["/about"] = function()
        return "200 OK", "<h1>About Page</h1><p>This is a simple Lua web server.</p>"
    end,
    ["/404"] = function()
        return "404 Not Found", "<h1>404 - Page Not Found</h1>"
    end
}

-- メインループ
while true do
    local client = server:accept()
    client:settimeout(60)
    
    -- リクエストを読み込む
    local request = client:receive()
    if request then
        local method, path = request:match("(%u+)%s+(/[^%s]*)")
        
        -- ルートの処理
        local handler = routes[path] or routes["/404"]
        local status, content = handler()
        
        -- レスポンスの送信
        local response = generate_response(status, content)
        client:send(response)
    end
    
    client:close()
end