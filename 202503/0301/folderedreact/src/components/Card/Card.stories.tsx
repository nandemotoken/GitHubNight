import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <div>Card Content</div>,
  },
};

export const WithTitle: Story = {
  args: {
    title: "Card Title",
    children: <div>Card Content</div>,
  },
};

export const WithFooter: Story = {
  args: {
    children: <div>Card Content</div>,
    footer: <div>Footer Content</div>,
  },
};

export const Complete: Story = {
  args: {
    title: "Card Title",
    children: <div>Card Content</div>,
    footer: <div>Footer Content</div>,
  },
};
