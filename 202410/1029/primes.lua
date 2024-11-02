function isPrime(n)
  if n < 2 then
      return false
  end
  if n == 2 then
      return true
  end
  if n % 2 == 0 then
      return false
  end
  
  local limit = math.floor(math.sqrt(n))
  for i = 3, limit, 2 do
      if n % i == 0 then
          return false
      end
  end
  return true
end

-- 素数を100個見つける
local count = 0
local num = 2
local primes = {}

while count < 100 do
  if isPrime(num) then
      count = count + 1
      primes[count] = num
  end
  num = num + 1
end

-- 結果を表示
print("最初の100個の素数:")
for i = 1, #primes do
  io.write(primes[i])
  if i % 10 == 0 then
      io.write("\n")
  else
      io.write("\t")
  end
end