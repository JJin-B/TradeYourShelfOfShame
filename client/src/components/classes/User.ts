type EmailAddress = string;

class User {
  userName: string;
  name: string;
  email: EmailAddress;

  constructor(userName: string, name: string, email: EmailAddress) {
    this.userName = userName;
    this.name = name;
    if (!this.isValidEmail(email)) {
      throw new Error("Invalid Email Address");
    }

    this.email = email;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default User;
