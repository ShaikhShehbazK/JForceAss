
package in.parashift.jfdemo.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.parashift.jfdemo.entities.Feedback;
import in.parashift.jfdemo.repositories.FeedbackRepository;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Override
    public Feedback addFeedback(Feedback feedback) {

        feedback.setCreatedDate(LocalDateTime.now());
        feedback.setUpdatedDate(LocalDateTime.now());

        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getUserFeedback(Long userId) {

        return feedbackRepository.findByUserId(userId);
    }

    @Override
    public Feedback updateFeedback(Long id, Feedback feedback) {

        Optional<Feedback> optionalFeedback = feedbackRepository.findById(id);

        if (optionalFeedback.isPresent()) {

            Feedback existingFeedback = optionalFeedback.get();

            existingFeedback.setFeedback(feedback.getFeedback());
            existingFeedback.setUpdatedDate(LocalDateTime.now());

            return feedbackRepository.save(existingFeedback);
        }

        return null;
    }

    @Override
    public List<Feedback> getAllFeedback() {

        return feedbackRepository.findAll();
    }

    @Override
    public void deleteFeedback(Long id) {

        feedbackRepository.deleteById(id);
    }
}
