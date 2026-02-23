package com.kevin.portfolio.repository;

import com.kevin.portfolio.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> 
{

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);


    
}

/*
By extending:
JpaRepository<User, Long>
You automatically get:
save()
findById()
findAll()
deleteById()
and more

The repository:
Talks to the database
Saves entities
Finds entities
Deletes entities
*/
