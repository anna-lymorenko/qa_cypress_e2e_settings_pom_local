import homePageObject from '../support/pages/home.pageObject';
import settingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
/// <reference types="cypress" />
/// <reference types="../support" />

const homePage = new homePageObject();
const settingsPage = new settingsPageObject();
const signInPage = new SignInPageObject();

const userData = {
  username: 'riot',
  email: 'riot@qa.team',
  password: '12345Qwert!',
}

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    homePage.clearDatabase();
    homePage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    settingsPage.loggedUser();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.updateUsername(user.username);
    settingsPage.clickSubmitButton();
    homePage.verifyNewUsernameLink(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.updateBio(user.bio);
    settingsPage.clickSubmitButton();
    homePage.clickSettingsLink();
    settingsPage.assertBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.updateEmail(user.email);
    settingsPage.clickSubmitButton();
    homePage.clickSettingsLink();
    settingsPage.logOut();
    settingsPage.assertLogOut();
    signInPage.visit();
    signInPage.enterEmail(user.email);
    signInPage.enterPassword(userData.password);
    signInPage.clickSignInBtn();
    homePage.verifyUsernameLink(userData.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.updatePassword(user.password);
    settingsPage.clickSubmitButton();
    homePage.clickSettingsLink();
    settingsPage.logOut();
    settingsPage.assertLogOut();
    signInPage.visit();
    signInPage.enterEmail(userData.email);
    signInPage.enterPassword(user.password);
    signInPage.clickSignInBtn();
    homePage.verifyUsernameLink(userData.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logOut();
    settingsPage.assertLogOut();
  });
});
