import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage, CartPage } from '../pages';

test('cancel from cart and return to inventory', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.goToCart();
  await cartPage.continueShopping();

  await expect(page).toHaveURL('/inventory.html');
});

test('sign in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL('/inventory.html');
});

test('logout successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');

  await expect(page).toHaveURL('/');
});