import AppScreen from './app.screen';

const SELECTORS = {
  CREATE_TOGO_ID_BUTTON: '~Create Togo ID Button',
  SIGNIN_WITH_TOGO_ID_BUTTON: '~Sign In Button',
  WELCOME_CAROUSEL: '~Welcome Carousel'
};

class WelcomeScreen extends AppScreen {
  constructor() {
    super(SELECTORS.CREATE_TOGO_ID_BUTTON);
  }

  // =======
  // getters
  // =======
  get createIDButton() {
    return $(SELECTORS.CREATE_TOGO_ID_BUTTON);
  }
  get signinWithIDButton() {
    return $(SELECTORS.SIGNIN_WITH_TOGO_ID_BUTTON);
  }
  get welcomeCarousel() {
    return $(SELECTORS.WELCOME_CAROUSEL);
  }

  // =======
  // methods
  // =======
  createId(){
    console.log('clicking [Create a Togo ID] button');
    this.createIDButton.click();
  }

  signIn(){
    console.log('clicking [Sign in with your Togo ID] button');
    this.signinWithIDButton.click();
  }

}


export default new WelcomeScreen();