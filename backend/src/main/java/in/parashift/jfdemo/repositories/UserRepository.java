package in.parashift.jfdemo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import in.parashift.jfdemo.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    boolean existsByEmail(String email);
}
