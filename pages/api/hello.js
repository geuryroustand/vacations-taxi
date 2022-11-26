// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// eslint-disable-next-line unicorn/prevent-abbreviations
export default function handler(request) {
  request.status(200).json({ name: "John Doe" });
}
