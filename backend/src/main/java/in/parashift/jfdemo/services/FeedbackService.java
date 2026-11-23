
package in.parashift.jfdemo.services;

import java.util.List;

import in.parashift.jfdemo.entities.Feedback;

public interface FeedbackService {

    Feedback addFeedback(Feedback feedback);

    List<Feedback> getUserFeedback(Long userId);

    Feedback updateFeedback(Long id, Feedback feedback);

    List<Feedback> getAllFeedback();

    void deleteFeedback(Long id);
}
