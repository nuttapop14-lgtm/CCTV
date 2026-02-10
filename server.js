const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Initialize socket.io with CORS enabled for all origins
const io = new Server(server, {
  cors: {
    origin: "*", // อนุญาตการเชื่อมต่อจากทุก Domain
    methods: ["GET", "POST"]
  }
});

let broadcasterSocketId = null; // เก็บ socket ID ของ Broadcaster
let viewerSocketIds = new Set(); // เก็บ socket ID ของ Viewers ทั้งหมด

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Broadcaster ลงทะเบียนตัวเอง
  socket.on('register-broadcaster', () => {
    broadcasterSocketId = socket.id;
    console.log('Broadcaster registered:', broadcasterSocketId);
    // แจ้ง Viewer ที่เชื่อมต่ออยู่แล้วว่า Broadcaster พร้อมแล้ว
    viewerSocketIds.forEach(viewerId => {
      io.to(viewerId).emit('broadcaster-ready');
    });
    socket.emit('broadcaster-registered');
  });

  // Viewer ลงทะเบียนตัวเอง
  socket.on('register-viewer', () => {
    viewerSocketIds.add(socket.id);
    console.log('Viewer registered:', socket.id);
    // ถ้า Broadcaster พร้อมอยู่แล้ว ให้แจ้ง Viewer คนนี้
    if (broadcasterSocketId) {
      socket.emit('broadcaster-ready');
    }
  });
  
  // Viewer ส่ง SDP Offer ไปยัง Broadcaster
  socket.on('offer', (data) => {
    if (broadcasterSocketId) {
      console.log(`Relaying offer from viewer (${socket.id}) to broadcaster`);
      io.to(broadcasterSocketId).emit('offer', { sdp: data.sdp, viewerId: socket.id });
    } else {
      console.log('No broadcaster available to receive offer.');
    }
  });

  // Broadcaster ส่ง SDP Answer กลับไปยัง Viewer เฉพาะคน
  socket.on('answer', (data) => {
    console.log(`Relaying answer from broadcaster to viewer: ${data.viewerId}`);
    io.to(data.viewerId).emit('answer', { sdp: data.sdp });
  });
  
  // แลกเปลี่ยน ICE Candidates
  socket.on('ice-candidate', (data) => {
    console.log(`Relaying ICE candidate from ${socket.id} to ${data.to}`);
    io.to(data.to).emit('ice-candidate', { candidate: data.candidate, from: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    if (socket.id === broadcasterSocketId) {
      console.log('Broadcaster disconnected.');
      broadcasterSocketId = null;
      // แจ้ง Viewer ทุกคนว่า Broadcaster ตัดการเชื่อมต่อแล้ว
      viewerSocketIds.forEach(viewerId => {
        io.to(viewerId).emit('broadcaster-disconnected');
      });
      viewerSocketIds.clear(); // ล้าง Viewers เมื่อ Broadcaster หลุด
    } else {
      // ลบ Viewer ออกจากรายการ
      viewerSocketIds.delete(socket.id);
      console.log('A viewer disconnected.');
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Signaling server listening on port ${PORT}`);
});

