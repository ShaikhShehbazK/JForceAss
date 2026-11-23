
package in.parashift.jfdemo.services;

import in.parashift.jfdemo.entities.User;

public interface UserService {

    User registerUser(User user);

    User loginUser(String email, String password);
}
