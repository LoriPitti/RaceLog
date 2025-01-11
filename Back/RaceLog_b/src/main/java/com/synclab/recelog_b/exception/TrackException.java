package com.synclab.recelog_b.exception;


import lombok.NoArgsConstructor;

@NoArgsConstructor
public class TrackException extends Exception{

    public TrackException(String msg){
        super(msg);
    }

}


