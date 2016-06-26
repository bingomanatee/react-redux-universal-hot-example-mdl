import mongoose from 'mongoose';

export default url => {
    const conn = mongoose.createConnection(url);
    conn.on('error', (err) => console.error('url:', url, 'MONGOOSE CONNECTION ERROR:', err));
    return conn;
}
