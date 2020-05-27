const travel = [];

export default function request(travelling) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      if (travelling) {
        travel.push(travelling);
        resolve(travel)
      } else {
        reject({
          error: 'Bad Request',
        });
      }
    });
  });
}
