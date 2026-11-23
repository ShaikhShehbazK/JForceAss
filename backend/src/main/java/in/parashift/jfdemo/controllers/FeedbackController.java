
package in.parashift.jfdemo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.parashift.jfdemo.entities.Feedback;
import in.parashift.jfdemo.entities.User;
import in.parashift.jfdemo.services.FeedbackService;
import in.parashift.jfdemo.repositories.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private UserRepository userRepository;

    // Add Feedback
    @PostMapping("/add")
    public ResponseEntity<?> addFeedback(
            @RequestParam Long userId,
            @RequestBody Feedback feedback) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }

        feedback.setUser(user);

        Feedback savedFeedback = feedbackService.addFeedback(feedback);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedFeedback);
    }

    // Get Feedback of a particular user
    @GetMapping("/my/{userId}")
    public ResponseEntity<List<Feedback>> getUserFeedback(
            @PathVariable Long userId) {

        List<Feedback> feedbackList =
                feedbackService.getUserFeedback(userId);

        return ResponseEntity.ok(feedbackList);
    }

    // Update Feedback
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateFeedback(
            @PathVariable Long id,
            @RequestBody Feedback feedback) {

        Feedback updatedFeedback =
                feedbackService.updateFeedback(id, feedback);

        if (updatedFeedback == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedFeedback);
    }
}
