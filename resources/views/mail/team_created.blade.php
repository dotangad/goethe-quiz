<style>
    * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
</style>

<div style="background-color: rgba(247, 248, 252, 1); padding: 50px;">
    <div class="images">
        <img src="https://cdn.discordapp.com/attachments/688434622387716096/885006315687137280/dpslogo.png" />
        <img src="https://cdn.discordapp.com/attachments/688434622387716096/885006314202357820/goethelogo.png" />
    </div>
    <div style="border: none;border-radius: 10px;background:white; padding: 20px; max-width: 750px; margin: 0 auto;">
        <h1>Registration complete!</h1>

        <p>We look forward to your participation in the DPS Goethe Quiz. Use the following credentials to <a href="https://dpsgoethequiz.com">login</a>:</p>

        <table>
            <tr>
                <td>Email</td>
                <td>{{ $user->email }}</td>
            </tr>
            <tr>
                <td>Student 1</td>
                <td>{{ $teamInfo->student_1 }}</td>
            </tr>
            <tr>
                <td>Student 2</td>
                <td>{{ $teamInfo->student_2 }}</td>
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
</div>