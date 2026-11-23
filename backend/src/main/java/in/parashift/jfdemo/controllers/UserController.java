
package in.parashift.jfdemo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.parashift.jfdemo.entities.User;
import in.parashift.jfdemo.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        try {
            User savedUser = userService.registerUser(user);

            savedUser.setPassword(null);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);

        } catch (RuntimeException e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {

        try {
            User loggedInUser = userService.loginUser(
                    user.getEmail(),
                    user.getPassword()
            );

            loggedInUser.setPassword(null);

            return ResponseEntity.ok(loggedInUser);

        } catch (RuntimeException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }
}
