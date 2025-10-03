# LinkUp - Real-Time Chat Application

<<<<<<< HEAD
LinkUp is a real-time chat application developed using **Flutter** and **Firebase**. It enables users to connect instantly with friends and communities, offering a seamless messaging experience.

---

## 🌟 Features

- Real-time messaging with instant updates.
- User authentication (email/password & Google sign-in).
- Cloud storage for messages and media.
- Modular, scalable Flutter codebase.

---

## 🧩 Architecture & Code Overview

The project is organized for clarity and maintainability:

### Folder Structure

- `lib/` – Main Dart code:
  - `models/` – Data structures:
    - `User.dart` – Represents user info (uid, email, name, avatar).
    - `Message.dart` – Stores message content, timestamp, sender id.
    - `ChatRoom.dart` – Represents a chat room with participants and messages.
  - `screens/` – UI pages:
    - `LoginScreen.dart` – Handles user login/signup.
    - `ChatScreen.dart` – Displays messages and input field.
    - `ChatRoomListScreen.dart` – Shows all available chat rooms.
  - `services/` – Business logic:
    - `AuthService.dart` – Firebase authentication helper methods.
    - `DatabaseService.dart` – CRUD operations for Firestore (create chat rooms, send messages, fetch messages).
  - `widgets/` – Reusable UI components:
    - `MessageBubble.dart` – Displays individual messages with styling.
    - `CustomTextField.dart` – Input field with consistent style.

- `assets/` – Images, icons, and static files.

---

## ⚙️ Core Code Methods

### 1. Authentication

```dart
class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Sign up with email & password
  Future<User?> signUp(String email, String password) async {
    final result = await _auth.createUserWithEmailAndPassword(email: email, password: password);
    return result.user;
  }

  // Sign in
  Future<User?> signIn(String email, String password) async {
    final result = await _auth.signInWithEmailAndPassword(email: email, password: password);
    return result.user;
  }

  // Sign out
  Future<void> signOut() async {
    await _auth.signOut();
  }
}
=======
LinkUp is a real-time chat application developed using Flutter and Firebase. It enables users to connect instantly with friends and communities, offering a seamless messaging experience.

## Features

- **Real-Time Messaging**: Instant communication with friends and groups.
- **User Authentication**: Secure sign-in using Firebase Authentication.
- **Cloud Storage**: Store and retrieve messages and media using Firebase Firestore.
- **Push Notifications**: Stay updated with real-time notifications for new messages.

## Technologies Used

- **Flutter**: Framework for building natively compiled applications for mobile.
- **Firebase**: Backend-as-a-Service for authentication, database, and storage.

## Installation

To run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Swamirajpatilshambhu789/Projects.git
   cd Projects/High\ lvl/LinkUp
>>>>>>> da665dc4facce68957cd5161b86c96d764f65d20
