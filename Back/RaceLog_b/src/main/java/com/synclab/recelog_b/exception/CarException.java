package com.synclab.recelog_b.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class CarException extends RuntimeException {
    public CarException(String message) {
        super(message);
    }
}
