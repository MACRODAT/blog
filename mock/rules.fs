rules_version = '2';

service cloud.firestore {
	
  match /databases/{database}/documents {
    // True if the user is signed in or the requested data is 'public'
    match /Users/{userid} {
      allow get, read, write, delete: if
          request.auth != null && request.auth.uid == userid;
    }
  }
}