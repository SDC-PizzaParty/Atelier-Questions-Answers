import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 100,
  duration: '15s',
  timeUnit: '1m',
};
// export const options = {
//   scenarios: {
//     constant_request_rate: {
//       executor: 'constant-arrival-rate',
//       rate: 1,
//       timeUnit: '1s',
//       duration: '1m',
//       preAllocatedVUs: 20,
//       maxVUs: 100,
//     },
//   },
// };
// export const options = {
//   scenarios: {
//     constant_request_rate: {
//       executor: 'constant-arrival-rate',
//       rate: 1,
//       timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
//       duration: '15s',
//       preAllocatedVUs: 1, // how large the initial pool of VUs would be
//       maxVUs: 1000, // if the preAllocatedVUs are not enough, we can initialize more
//     },
//   },
// };

export default function () {
  http.get('http://localhost:25565/qa/questions/?product_id=65560');
  sleep(0.1);
}