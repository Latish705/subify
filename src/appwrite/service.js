// import {ID, Account, Client} from 'appwrite';

// const appwriteClient = new Client();

// // const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
// // const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;

// const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';
// const APPWRITE_PROJECT_ID = '65c7168b87f606aefef3';

// class AppwriteService {
//   account;

//   constructor() {
//     appwriteClient
//       .setEndpoint(APPWRITE_ENDPOINT)
//       .setProject(APPWRITE_PROJECT_ID);

//     this.account = new Account(appwriteClient);
//   }

//   //create a new record of user inside appwrite

//   async createAccount({email, password, username}) {
//     try {
//       console.log('going into network', email, password, username);
//       const userAccount = await this.account.create(
//         ID.unique(),
//         email,
//         password,
//         username,
//       );
//       if (userAccount) {
//         //TODO: create login feature
//         return this.login({email, password});
//       } else {
//         return userAccount;
//       }
//     } catch (error) {
//       console.log('Appwrite service :: createAccount() :: ' + error);
//     }
//   }

//   async login({email, password}) {
//     try {
//       return await this.account.createEmailSession(email, password);
//     } catch (error) {
//       console.log('Appwrite service :: loginAccount() :: ' + error);
//     }
//   }

//   async getCurrentUser() {
//     try {
//       return await this.account.get();
//     } catch (error) {
//       console.log('Appwrite service :: getCurrentAccount() :: ' + error);
//     }
//   }

//   async logout() {
//     try {
//       return await this.account.deleteSession('current');
//     } catch (error) {
//       console.log('Appwrite service :: getCurrentAccount() :: ' + error);
//     }
//   }
// }

// export default AppwriteService;
