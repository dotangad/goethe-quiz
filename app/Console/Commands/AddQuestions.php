<?php

namespace App\Console\Commands;

use App\Models\Question;
use Illuminate\Console\Command;

class AddQuestions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'add_questions {csv}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $csv = $this->argument('csv');
        $lines = file($csv);

        foreach ($lines as $line) {
            $line_csv = str_getcsv($line, "\t");
            $q = new Question([
                'id' => $line_csv[0],
                'text' => $line_csv[1],
                'answer' => $line_csv[2],
                'hint' => $line_csv[3],
            ]);
            $q->save();
        }

        // dd($questions->toArray());

        // Question::insert($questions->toArray());

        return 0;
    }
}
