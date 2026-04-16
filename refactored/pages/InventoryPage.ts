import { Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly shoppingCartLink;
  readonly shoppingCartBadge;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
  }

  async addToCart(itemName: string) {
    await this.page.locator(`[data-test="add-to-cart-${itemName}"]`).click();
  }

  async removeFromCart(itemName: string) {
    await this.page.locator(`[data-test="remove-${itemName}"]`).click();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }
}