

class User {
  constructor({userInfo}) {
    this.id = userInfo.userId;
    this.name = userInfo.userName;
    this.lastName = userInfo.userLastName;
    this.secondLastName = userInfo.userSecondLastName;
    this.age = userInfo.userAge;
    this.sex = userInfo.userSex;
    this.semester = userInfo.userSemester;
    this.email = userInfo.userEmail;
    this.userName = userInfo.userUserName;
    this.password = userInfo.userPassword;
    this.token = userInfo.token;
    this.isSatisfied();
  }
  isSatisfied() {
    if (!this.id) throw new Error('Invalid userInfo for entitie User');
  }
}

module.exports = User;