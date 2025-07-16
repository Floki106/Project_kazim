START

DISPLAY buttons: rock, paper, scissors for player to choose

WHEN player clicks a button:
    SET playerChoice to chosen option

    RANDOMLY select computerChoice from rock, paper, scissors

    IF playerChoice equals computerChoice THEN
        result = "It's a tie!"
    ELSE IF
        playerChoice beats computerChoice based on rules THEN
        result = "Player wins!"
    ELSE
        result = "Computer wins!"

    DISPLAY playerChoice, computerChoice, and result

END
