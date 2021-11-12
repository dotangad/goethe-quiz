<?php

namespace App\Console\Commands;

use App\Models\Question;
use Illuminate\Console\Command;

class SwapQuestions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'swap_questions {one} {two}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Swap questions passed';

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
        $one = Question::find($this->argument('one'));
        $two = Question::find($this->argument('two'));

        if (!$one || !$two) {
            $this->info('Question does not exist');
            return;
        }

        if ($one->users()->count() !== 0 || $two->users()->count() !== 0) {
            $this->info('There are users on one or both of these questions, can not swap');
            return;
        }

        $one_copy = $one->toArray();
        $one->text = $two->text;
        $one->hint = $two->hint;
        $one->answer = $two->answer;
        $one->save();
        $two->text = $one_copy['text'];
        $two->hint = $one_copy['hint'];
        $two->answer = $one_copy['answer'];
        $two->save();

        return 0;
    }
}
