package com.myapp.backend.models;

public class Submission {
    private String id;
    private String userId;
    private String message;
    private String timestamp;
    private String email;
    
    // Constructors
    public Submission() {}
    
    public Submission(String id, String userId, String message, String timestamp) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.timestamp = timestamp;
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
