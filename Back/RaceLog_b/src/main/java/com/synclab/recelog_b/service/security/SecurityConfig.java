package com.synclab.recelog_b.service.security;

import com.synclab.recelog_b.Util.JwtTokenUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig   {
    private final JwtTokenUtil jwtTokenUtil;

    public SecurityConfig(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

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
                .requestMatchers("/user/login", "/user/signup", "/usernames",
                                    "/tracksname","/tracks",
                                     "/cars",  "carsname").permitAll()
                .anyRequest().authenticated())
                .addFilterBefore(new JwtAuthFilter(jwtTokenUtil), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
