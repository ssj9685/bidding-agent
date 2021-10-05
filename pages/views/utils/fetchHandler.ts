export default async function fetchHandler(response) {
  switch (response.status) {
    case 200:
      location.href = '/';
      break;
    case 401:
      console.log(await response.json());
      break;
  }
}
