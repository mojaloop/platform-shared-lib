const { execFileSync } = require('child_process');
const path = require('path');

const protoDir = path.resolve(__dirname, 'src/protobuff');
const protoFile = path.resolve(protoDir, 'messages.proto');
const outDir = path.resolve(protoDir);

const command = 'protoc';
const args = [
    `--ts_out=service=true:${outDir}`,
    `--proto_path=${protoDir}`,
    protoFile
];

try {
    execFileSync(command, args, { stdio: 'inherit' });
} catch (error) {
    console.error('Error executing command:', error);
    process.exit(1);
}
