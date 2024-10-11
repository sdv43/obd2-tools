## Description 

This package contains a sniffer and an obd2 adapter emulator. The sniffer and the emulator only work with wifi adapters. By analogy, you can write an adapter sniffer that connects to a computer via USB using the [serialport](https://www.npmjs.com/package/serialport).

### Configuration

In the `sniffer-emulator/src/logs.ts` the `logDir` variable specifies the path to the directory where the logs are saved. One log file represents one session of communication  with the sniffer. The log is saved when the diagnostic program is disconnected from the sniffer, i.e. when the tcp socket is closed. 

The sniffer and the emulator listen on all Internet interfaces of the computer on port 35000. This information is also displayed in the console after startup.

### Configuring the sniffer

In the `sniffer-emulator/src/cli/snifferWifi.ts` file, the `adapterConfig` variable specifies address and port of the adapter to listen to.

### Configuring the emulator

In the file `sniffer-emulator/src/cli/emulatorWifi.ts`, the `config` variable specifies the log file that gives responses to AT commands from the diagnostic program.

In the `fakeResponses` variable, it is possible to specify another response to the AT command. Use it when you need to give different answers to the diagnostic program to see how the values change. Thus, the emulator first looks for answers in `fakeResponses`, if there is no response to the command, the answer is taken from the log file.

## Launch

The sniffer is started by the `npm run start:sniffer` command. 

The emulator is started by the `npm run start:emulator` command.