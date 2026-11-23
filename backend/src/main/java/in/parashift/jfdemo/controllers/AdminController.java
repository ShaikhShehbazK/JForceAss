
package in.parashift.jfdemo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import in.parashift.jfdemo.entities.Feedback;
import in.parashift.jfdemo.services.FeedbackService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/admin/feedback")
public class AdminController {

    @Autowired
    private FeedbackService feedbackService;

    // Get all feedback
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {

        List<Feedback> feedbackList = feedbackService.getAllFeedback();

        return ResponseEntity.ok(feedbackList);
    }

    
    // Update feedback
    @PutMapping("/{id}")
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

    // Delete feedback
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {

        if (!feedbackService.getAllFeedback().stream()
                .anyMatch(feedback -> feedback.getId().equals(id))) {
            return ResponseEntity.notFound().build();
        }

        feedbackService.deleteFeedback(id);

        return ResponseEntity.noContent().build();
    }
    
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @GetMapping("/generate-password")
//    public String generatePassword() {
//        return passwordEncoder.encode("Admin@123");
//    }
}
