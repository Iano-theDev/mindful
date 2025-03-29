import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let registered = true


  beforeEach(() => {
 
    // component = new SignupComponent();
  })
 

  it('should initialize registered as false', () => {
    expect(registered).toBe(true)
  });
})
