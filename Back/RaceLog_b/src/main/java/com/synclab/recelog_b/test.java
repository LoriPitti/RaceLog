package com.synclab.recelog_b;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class test {

        public static void main(String[] args) {
            String fileName = "C:/Program Files (x86)/SimHub/PluginsData/AssettoCorsaCompetizione/MapRecords/monza.shtl"; // Inserisci il nome del tuo file .shtl
            try {
                BufferedReader reader = new BufferedReader(new FileReader(fileName));
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line); // Stampa ogni riga del file
                }
                reader.close();
            } catch (IOException e) {
                System.err.println("Errore durante la lettura del file: " + e.getMessage());
            }
        }

}
