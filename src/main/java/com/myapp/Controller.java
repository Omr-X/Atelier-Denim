package com.myapp;

import com.myapp.backend.models.Submission;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.io.*;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {
    
    private static final String JSON_FILE = "data/submissions.json";
    private final Gson gson = new Gson();
    
    public Controller() {
        try {
            File file = new File(JSON_FILE);
            file.getParentFile().mkdirs();
            if (!file.exists()) {
                Files.write(Paths.get(JSON_FILE), "[]".getBytes());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    private List<Submission> readSubmissions() {
        try {
            String json = new String(Files.readAllBytes(Paths.get(JSON_FILE)));
            Type listType = new TypeToken<ArrayList<Submission>>(){}.getType();
            List<Submission> submissions = gson.fromJson(json, listType);
            return submissions != null ? submissions : new ArrayList<>();
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
    
    private void writeSubmissions(List<Submission> submissions) {
        try {
            String json = gson.toJson(submissions);
            Files.write(Paths.get(JSON_FILE), json.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    @PostMapping("/submit")
    public ResponseEntity<?> submitData(@RequestBody Submission submission) {
        try {
            submission.setId(UUID.randomUUID().toString());
            submission.setTimestamp(new Date().toString());
            
            List<Submission> submissions = readSubmissions();
            submissions.add(submission);
            writeSubmissions(submissions);
            
            System.out.println("New submission saved: " + submission.getMessage());
            
            return ResponseEntity.ok().body(Map.of(
                "success", true,
                "message", "Data saved successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }
    
    @GetMapping("/submissions")
    public ResponseEntity<List<Submission>> getSubmissions() {
        List<Submission> submissions = readSubmissions();
        return ResponseEntity.ok(submissions);
    }
    
    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of("status", "Server is running!"));
    }
}
