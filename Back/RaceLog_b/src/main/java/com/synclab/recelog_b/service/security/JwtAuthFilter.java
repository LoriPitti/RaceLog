package com.synclab.recelog_b.service.security;

import com.synclab.recelog_b.Util.JwtTokenUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtTokenUtil jwtTokenUtil;
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthFilter.class);

    public JwtAuthFilter(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = getJwtFromRequest(request);
        logger.info("Token ricevuto: {}", token);
        if (token != null && jwtTokenUtil.validateToken(token, jwtTokenUtil.extractUsername(token))) {
            String username =   jwtTokenUtil.extractUsername(token);
            boolean isAdmin= jwtTokenUtil.isAdmin(token);

            //Assegno il  ruolo
            List<GrantedAuthority> authorities  =  new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(isAdmin ? "ROLE_ADMIN" : "ROLE_USER"));
            logger.info("Username: {}, Ruolo: {}", username, isAdmin ? "ROLE_ADMIN" : "ROLE_USER");

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
              username     , null, authorities); // Il subject è l'username
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    // Estrae il token JWT dall'header Authorization
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Rimuove "Bearer " per ottenere solo il token
        }
        return null;
    }
}
