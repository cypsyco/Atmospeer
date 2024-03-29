package com.example.atmospeer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;
    @Getter
    private String masterUser;
    @Getter
    private String url;
    @Getter
    private String roomName;
    @Getter
    private String roomImage;

    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    public void setMasterUser(String masterUser) {
        this.masterUser = masterUser;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setRoomName(String roomname) {
        this.roomName = roomname;
    }

    public void setRoomImage(String roomimage) {
        this.roomImage = roomimage;
    }

}
