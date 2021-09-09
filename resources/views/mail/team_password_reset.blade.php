<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    <style>
        * {
            font-family: 'Inter var', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            color: #333;
        }

        .images {
            display: flex;
            margin-bottom: 30px;
            justify-content: center;
            width: 100%;
        }

        .images img {
            height: 80px;
            width: auto;
        }

        .signoff {
            margin-top: 30px;
            font-size: 0.9rem;
            color: #666;
        }

        table td {
            padding: 10px;
        }

        footer {
            display: flex;
            flex-direction: column;
            margin-top: 3.25rem;
            align-items: center;
        }

        footer * {
            color: rgb(107, 114, 128);
            font-size: 0.75rem;
        }

        footer a {
            font-weight: bold;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div style="background-color: rgba(247, 248, 252, 1); padding: 50px;">
        <div class="images">
            <img src="https://cdn.discordapp.com/attachments/688434622387716096/885006315687137280/dpslogo.png" />
            <img src="https://cdn.discordapp.com/attachments/688434622387716096/885006314202357820/goethelogo.png" />
        </div>
        <div style="border: none;border-radius: 10px;background:white; padding: 20px; max-width: 750px; margin: 0 auto;">
            <h1>Password Reset</h1>

            <p>Your password has been reset by the admin. Use the following credentials to <a href="https://dpsgoethequiz.com">login</a>:</p>

            <table>
                <tr>
                    <td>Email</td>
                    <td>{{ $user->email }}</td>
                </tr>
                <tr>
                    <td>Student 1</td>
                    <td>{{ $user->student_1 }}</td>
                </tr>
                <tr>
                    <td>Student 2</td>
                    <td>{{ $user->student_2 }}</td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td style="font-family: monospace;">{{ $password }}</td>
                </tr>
            </table>

            <div class="signoff">
                Best Regards,<br />
                DPS Society and Goethe-Institut<br />
                Please <a href="mailto:goethequiz@dpsrkp.net">reach out to us</a> if you have any problems
            </div>
        </div>

        <footer>
            <div style="font-size: 18px; color: rgba(209, 213, 219);">
                &bull;&bull;&bull;
            </div>
            <div style="margin-bottom: 10px;">
                <a target="_blank" rel="noreferrer" href="#">DPS Society</a> | <a target="_blank" rel="noreferrer" href="https://goethe.de">Goethe Institut</a> | <a target="_blank" rel="noreferrer" href="https://dpsrkp.net">DPS RK Puram</a>
            </div>
            <div>&copy; 2021 DPS Society and DPS RK Puram, New Delhi, India</div>
            <div>
                All rights reserved. Online quiz tool developed by <a href="//angad.dev" target="_blank" rel="noreferrer">Angad Singh</a>, <a href="//kavin.me" target="_blank" rel="noreferrer">Kavin Valli</a> and <a href="//someshkar.com" target="_blank" rel="noreferrer">Somesh Kar</a> of <a href="//exunclan.com" target="_blank" rel="noreferrer">Exun Clan</a>.
            </div>
        </footer>
    </div>
</body>

</html>