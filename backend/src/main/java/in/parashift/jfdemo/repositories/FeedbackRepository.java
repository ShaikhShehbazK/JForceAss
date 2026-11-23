
package in.parashift.jfdemo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.parashift.jfdemo.entities.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findByUserId(Long userId);
}
