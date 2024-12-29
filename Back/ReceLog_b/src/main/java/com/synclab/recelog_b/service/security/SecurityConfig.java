package com.synclab.recelog_b.service.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig   {

    /**
     * permette l'accesso senta autenticazione agli endpoint stabiliti
     * @param http
     * @return
     * @throws Exception
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable). //permette le POST
                authorizeHttpRequests(auth -> auth
                .requestMatchers("/user/login", "/user/signup", "/usernames").permitAll()
                .anyRequest().authenticated()

        );
        return http.build();
    }

}
