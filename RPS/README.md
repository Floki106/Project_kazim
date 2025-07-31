 

startGame():
    set player1Score = 0
    set player2Score = 0
    winningScore = 5

    ask user: "Player vs Player or Player vs Computer?"
    if user chooses "Player vs Player":
        gameMode = "P"
    else:
        gameMode = "C"

    startRound()

startRound():
    while neither player1Score nor player2Score is 5:
        if gameMode is "P":
            show "Player 1: Choose Rock, Paper, or Scissors"
            wait for player1 to choose
            store player1Choice

            show "Player 2: Choose Rock, Paper, or Scissors"
            wait for player2 to choose
            store player2Choice

        else if gameMode is "C":
            show "You: Choose Rock, Paper, or Scissors"
            wait for player1 to choose
            store player1Choice

            randomly pick for computer
            store computer's choice as player2Choice

        compare player1Choice and player2Choice:
            if both are the same:
                show "It's a tie!"
            else if player1 beats player2:
                player1Score += 1
                show "Player 1 wins this round!"
            else:
                player2Score += 1
                show "Player 2 wins this round!" (or "Computer wins!" if in computer mode)

        show choices and updated scores

    if player1Score == 5:
        show "Player 1 wins the game!" (or "You win!" if gameMode is "C")
    else:
        show "Player 2 wins the game!" (or "Computer wins!" if gameMode is "C")

    ask user: "Play Again?"
    if yes:
        startGame()
