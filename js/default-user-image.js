function createImageBase64() {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    // تعبئة الخلفية
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // رسم الدائرة
    ctx.fillStyle = '#E8F5E9';
    ctx.beginPath();
    ctx.arc(100, 80, 50, 0, Math.PI * 2, true);
    ctx.fill();
    
    // رسم الجسم
    ctx.fillStyle = '#E8F5E9';
    ctx.beginPath();
    ctx.ellipse(100, 230, 70, 100, 0, Math.PI, false);
    ctx.fill();
    
    return canvas.toDataURL('image/png');
}

const defaultUserImage = createImageBase64();