import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage, CartPage } from '../pages';

test('add item from product page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');

  await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
});

test('remove item from product page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');
  await inventoryPage.removeFromCart('sauce-labs-bolt-t-shirt');

  await expect(inventoryPage.shoppingCartBadge).toHaveCount(0);
});

test('add item from inventory page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart('sauce-labs-onesie');

  await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
});

test('remove item from inventory page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart('sauce-labs-bike-light');
  await inventoryPage.removeFromCart('sauce-labs-bike-light');

  await expect(inventoryPage.shoppingCartBadge).toHaveCount(0);
});

test('remove item from cart page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.goToCart();
  await cartPage.removeItem('sauce-labs-backpack');

  await expect(inventoryPage.shoppingCartBadge).toHaveCount(0);
});