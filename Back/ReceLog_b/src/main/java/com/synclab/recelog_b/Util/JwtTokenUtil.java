package com.synclab.recelog_b.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;
import java.util.Date;

@Service
public class JwtTokenUtil {

    @Value("${jwt.privateKey}")
    private String privateKey;
    @Value("${jwt.publicKey}")
    private String publicKey;

    /**
     * Metodo per caricare la chiave privata da Base64
     * @param keyBase64 la chiave privata in Base64
     * @return la chiave privata
     */
    private PrivateKey loadPrivateKey(String keyBase64) {
        try {
            // Decodifica la stringa Base64
            byte[] decoded = Base64.getDecoder().decode(keyBase64);

            // Verifica che la chiave sia in formato PKCS#8
            if (!isPKCS8(decoded)) {
                throw new RuntimeException("La chiave privata non è in formato PKCS#8");
            }

            // Carica la chiave privata
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(decoded);
            return keyFactory.generatePrivate(keySpec);
        } catch (Exception e) {
            throw new RuntimeException("Errore nel caricare la chiave privata", e);
        }
    }

    // Metodo di supporto per verificare se la chiave è in formato PKCS#8
    private boolean isPKCS8(byte[] keyBytes) {
        // Verifica che la chiave inizi con la sequenza di byte PKCS#8
        return keyBytes.length >= 4 && keyBytes[0] == 0x30 && keyBytes[1] == 0x82 && keyBytes[2] == 0x01 && keyBytes[3] == 0x0a;
    }

    /**
     * Metodo per caricare la chiave pubblica da Base64
     * @param keyBase64 la chiave pubblica in Base64
     * @return la chiave pubblica
     */
    private PublicKey loadPublicKey(String keyBase64) {
        try {
            byte[] decoded = Base64.getDecoder().decode(keyBase64);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            return keyFactory.generatePublic(new java.security.spec.X509EncodedKeySpec(decoded));
        } catch (Exception e) {
            throw new RuntimeException("Errore nel caricare la chiave pubblica", e);
        }
    }

    /**
     * Metodo  per generare il  JWT
     * @param username
     * @return
     */
    public String generateToken(String username) {
        PrivateKey pkey =  loadPrivateKey(privateKey);
        return Jwts.builder()
                .claim("sub", username)
                .claim("iat", new Date())
                .claim("exp", new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(SignatureAlgorithm.RS256,  pkey) // Firma con la chiave privata
                .compact(); // Crea il JWT
    }

    /**
     * Metodo  per estarre il subject dal JWT
     * @param token
     * @return
     */
    public String extractUsername(String token) {
        PublicKey pkey =  loadPublicKey(publicKey);
        JwtParser jwtParser = Jwts.parser()
                .setSigningKey(pkey)  // Imposta la chiave pubblica per la verifica
                .build();  // Crea un parser

        Claims claims = jwtParser.parseClaimsJws(token).getBody(); // Usa il parser per ottenere i claims
        return claims.getSubject();
    }

    /**
     * Metodo   per validare il JWT
     * @param token
     * @param username
     * @return
     */
    public boolean validateToken(String token, String username) {
        String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    /**
     * Metodo per controllare se il token è scaduto
     * @param token
     * @return
     */
    private boolean isTokenExpired(String token) {
        JwtParser jwtParser = Jwts.parser()
                .setSigningKey(publicKey)
                .build();

        Claims claims = jwtParser.parseClaimsJws(token).getBody();
        Date expiration = claims.getExpiration();  // Get the expiration date

        return expiration.before(new Date());
    }

}
