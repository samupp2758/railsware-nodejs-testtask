import { describe, expect, test } from "@jest/globals";
import { MailTrapClient } from "./src";
import { resolve } from "path";

const client = new MailTrapClient({
  user: "efb*********a1", //EDIT WITH YOUR CREDENTIALS
  pass: "b9*********0de", //EDIT WITH YOUR CREDENTIALS
});

describe("MailTrapClient", () => {
  test("With no subject,text,html, or attachments", async () => {
    const envelope = {
      from: "from@barfoo.com",
      to: ["foo@bar.com"],
    };

    const data = await client.send(envelope);
    expect(data).toMatchObject({ rejected: [], accepted: envelope.to });
  });

  test("With no text,html, or attachments", async () => {
    const envelope = {
      from: "from@barfoo.com",
      to: ["foo@bar.com"],
      subject: "Hello World (Cool Subject)",
    };

    const data = await client.send(envelope);
    expect(data).toMatchObject({ rejected: [], accepted: envelope.to });
  });

  test("With no html, or attachments", async () => {
    const envelope = {
      from: "from@barfoo.com",
      to: ["foo@bar.com"],
      subject: "Hello World (Cool Subject)",
      text: "Hello World! (Cool Text)",
    };

    const data = await client.send(envelope);
    expect(data).toMatchObject({ rejected: [], accepted: envelope.to });
  });

  test("With no attachments", async () => {
    const envelope = {
      from: "from@barfoo.com",
      to: ["foo@bar.com"],
      subject: "Hello World (Cool Subject)",
      text: "Hello World! (Cool Text)",
      html: "<html><head></head><body><h1 style='font-family:Arial;color:red;'>Hello World(Cool HTML Body!)</h1></body></html>",
    };

    const data = await client.send(envelope);
    expect(data).toMatchObject({ rejected: [], accepted: envelope.to });
  });

  test("Everything included", async () => {
    const envelope = {
      from: "from@barfoo.com",
      to: ["foo@bar.com"],
      subject: "Hello World (Cool Subject)",
      text: "Hello World! (Cool Text)",
      html: "<html><head></head><body><h1 style='font-family:Arial;color:red;'>Hello World(Cool HTML Body!)</h1></body></html>",
      attachments: [
        {   // utf-8 string as an attachment
            filename: 'text1.txt',
            content: 'hello world!'
        },
        {   // define custom content type for the attachment
            filename: 'text.bin',
            content: 'hello world!',
            contentType: 'text/plain'
        },
        {   // use URL as an attachment
            filename: 'license.txt',
            path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
        },
        {   // encoded string as an attachment
            filename: 'text2.txt',
            content: 'aGVsbG8gd29ybGQh',
            encoding: 'base64'
        },
        {   // data uri as an attachment
          filename:'duckie.jpeg',
          path:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAeKADAAQAAAABAAAAdwAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAdwB4AwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMADw8PDw8PGg8PGiQaGhokMSQkJCQxPjExMTExPks+Pj4+Pj5LS0tLS0tLS1paWlpaWmlpaWlpdnZ2dnZ2dnZ2dv/bAEMBEhMTHhweNBwcNHtURVR7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e//dAAQACP/aAAwDAQACEQMRAD8AxIxDGm9eM9RnuPer5V7yERrwi9Dx9fwqhBbEEbRxnoefrWvbBIC8YwMANt9q50xJFKW2ZMGLj1FCjcCjduDVgOJJd6tkfpUEiBZN6nGaQXLRTZGBip47TzIw559KYoMkWG4qwt1EkGzOG9BVIorBo0PP40kqb4mLsPVcVX2RqN9w2Mngd6f5XmNuz8vpQpCsU2DuTsbdtxx61DLM6JvxyvWr0qRhT5eRj0p9jpsupA5YJH0LHr+AqlqBRQpOoYdaWKQoShPIrrIPDNpEm2OVyfU4x+WK5fWtKudPkEjfNG3AcevoR2p2tqO5p2s8eNrtUssgbDIMgd65y1YRnd1PvViSeQgnOPYVDdwuact3GF+Uc1V+1yelZ0bM/J61Lh/WpuHMf//QzZ53jGwjCjpx6UtrcrvVsZ3EBieT6VDOpMIySWxnPqP8RVeNGMXy9ulcjdiebU0JJJbOYxMcoDwPapciQFwBnt71FNELiIMfvFcqfcdRRZAiMFj16UbMTWpCWmfiM4PpUwIWTbu3HHJ/wp08haUgdO4FKrruCqKdx3GuEPyyDNCKiDCsQafICwBbiqzoqtkHrU3FzEoZlfy1OSTj866+0tQkSxqcAVyVvtEyM3JBrqklcLuTkVtS2uxp3LkEFxFcO7T7o2xtQr0/GmasIbqyltXPJXI9iORVCTUJAcIMH/a4H51XtbqO4+ZiVkP3geP8iorVeRXRvTgpOzZxqKegFP24AJ5rd1LSmiQ3Nv8AcHLL6fT2rIRTj1rJSuro55RcXZkS7snbT90lAIXORzS+ZTsSf//Ry4pCYmJwxUgr0OKVthJjjGCTkj09R+FU7d2ii2n7zcj+VJ5hjDY6muSaZmzVh+aJo06r8w/kahjBT5fQ1FZyFSrHox2n8eKewILJ0KnH41LE2OZwrjd1NHAIK85qERZIcnkdjUyqC2RnFSxDgWPyk5pyqN+1uh9KaoUtgVMhwTtPsaLt7gKkQSRc+oxXSWkXHzHisS2V5JUTHfrXWW1vsQV0UVoXEy7+yXYZATwM1ze0A5HXrmu+nh82JozxuBFcVKvkyNBJwVOOaVVBIhUu2Vcnae1VhsQnbyKnMoY4HOOKZhAP5msETcgYZXIHOaZterYjXAb3xT9i+tMR/9LCi+VGdupOAetQggE98nvUbMcDIO0fdxVy3hSU7SGJI4C9f5VyNGQzezYVAc1au5w0gkjOdwBI/wBrvVyKOGKMbLbdlsDcSTkV0FrGBhiiRn0CjP51UYX0KtpY5eKzv7jGyM4PcjH6mt600MhR9pfnHIX/ABNbG7BqwjgCtVSitwUSGDTrOH7sS59Tyf1q6sEQ5VQPwoRganzxxWiSWxVisYwW6VZVcUgp9AARWJqtgt1EZIx+8Tke49K2i1RE0pK6swsebbWVvfNKxAcgc5q5qSCC9l2jjO7j3FZ5kYt0z0FcTVtDFk4+X5QMk0vzelNEiljngAY+tG9PSkB//9PLGGYiUd+Bir9vbh2AhIDL09frWUjEneTk1sWcn2d9zcg/pXHF66maZrTttKnoTywHr60LPgiq13NDOFaN9reh71at5oCAkgG5a6k77FF1UL45xVtYguO9V3kQOCOBU6yA1YFhQKmz2NZ5m2mk+0DPWkM0AwBo31Q87nJoM4BpNjLhcVXeYDj1qu0wxmqbzY+ZjUuQzM1Xb9pBXG4qM/rWZscBhj5Tz71fuLlTNn6AGq7MA+5j1H51zT3MXuUGbacKCW9T2pvmTe1XxtZTuA59PWofK/2azFY//9TGZXQnJHA4pxnJAQde9JIrScryRmqUkcsbkDnjk+1cS1MS/wCcq4XPzdaQ3TBs55HBrKLyfxDFHmLt5PNXGLQ1odLFqeVAbtV+PUAwBBFcSJipGKmE+Oc4rTmZSZ2324MMd6abxO5rkRct60eaT3qXNlpHYfb4sYJqKS/U9PwrlxKR0p3nN0FTzjszbN8x6npUD3LzHy1OM1QjUMT5h5Hb3rQUfIp4JHeociJS6IqqWwQ+VGeDirAyW3EEjHSnvllyo9v8+lPGCw3cY44qDOxBjYPlHB/z/Wm7z/dq4hUjai88n1FL+9/uD8jQVY//1aOYTlU4YknP+FMA5G76cdaQAseQOvGeOaYZCz4buMVwGNyKeFJfvZ4PWs2S2Kj5ec1rFS6/Nxt/WmjBjKA8H61ak0O5hMGQnnkelR7/AO9zW0LRWOW6Yzx1pptkdht4HB9OvatFUQ7mQX3dasZe3C7hwwyKvGyRsZ/EjqKsPbo0YiPIQ8E/rSc0aRkrWM0zE8DimROXuD9K0vsEWfmJ29h0NTiGBCsq8MBg56GlzR6DjJXuyrEpLc8A4/KtMMeARwKb8roEHA7YoLHYAeg9e4NZt3M3boWsqUIPQU4MAN7g8dT+lVcrjipBKgUjqM9KkB+1gN4BJ9+Rz2qLn+6P++Wpvl72bHA6Dnnp/wDWpPssnqfzFOwz/9bF8/zCUHGOalQ7zgHGKpRf61v89jVuH/WH6VxWMCVnBA5zz+veqxZUAOMknmnnt9ahk/rSGSMW+UcZ6HP1qXPmY3j8qjb7/wCJp69B/nsKGApcAYHTA/U0zcXLDH4/SmnoPoP5mlj++9NASk/KFPJ9fr6U12+YhegNO/iH1H86ib7z/jSAkU5XKjGTwetLvLkIeM5PFNT/AFY+tCf61f8AdP8AKgLjyyoOlNDqoCKOCcU2X7p/H+VMHUfU0IRIz5+cHGOKi8+T1H+fwo/gP1NQUIZ//9k=',     
        }
    ]
    };

    const data = await client.send(envelope);
    expect(data).toMatchObject({ rejected: [], accepted: envelope.to });
  });
});
