import moment from "moment";

export const refactorLogs = (logs) => {
  return logs.map((log) => {
    return {
      timestamp: log.timestamp,
      type: log.tcp ? "TCP" : "UDP",
      destination: log.ip ? log.ip.dst : "N/A",
      protocol: log.ip ? log.ip.protocol : "N/A",
      source: log.ip ? log.ip.src : "N/A",
      ttl: log.ip ? log.ip.ttl : "N/A",
      acknowledge: log.tcp ? log.tcp.ack : "N/A",
      destination_port: log.tcp ? log.tcp.dest_port : "N/A",
      flags: log.tcp ? log.tcp.flags : "N/A",
      payload_size: log.tcp ? log.tcp.payload_size : "N/A",
      sequence: log.tcp ? log.tcp.seq : "N/A",
      source_port: log.tcp ? log.tcp.source_port : "N/A",
    };
  });
};
