var human = 'O';
var ai = 'X';
var contador = 0;
(function(){
    const cells = document.querySelectorAll('.cell');
    for(let i=0; i< cells.length; i++){
        cells[i].addEventListener('click', () => Movimiento(cells[i], human));
    }
}())
var tabla = [0, 1, 2, 3, 4, 5, 6, 7, 8];
function Movimiento(element, simboloJugador) {
    var id = element.id.substr(1,1);
    if(tabla[id] != human && tabla[id] != ai) {
        contador++;
        tabla[id] = human;
        element.innerText = simboloJugador;
        element.style.pointerEvents = "none";
        if(vericarGanar(tabla, simboloJugador)) {
            setTimeout(function() {
                alert('Ganaste!');
                reset();
            }, 300);
            return;
        }
        else if(contador > 8) {
            setTimeout(function() {
                alert('Empate');
                reset();
            }, 300);
            return;
        }
        else {
            contador++;
            var index = minimax(tabla, ai).index;
            document.getElementById(`c${index}`).innerText = ai;
            document.getElementById(`c${index}`).style.pointerEvents = "none";
            tabla[index] = ai;
            if(vericarGanar(tabla, ai)) {
                setTimeout(function() {
                    alert('La Computadora Gano!');
                    reset();
                }, 300);
                return;
            }

        }
    }
}
function vericarGanar(tablaJugadores, simboloJugador) {
    return (tablaJugadores[0] == simboloJugador && tablaJugadores[1] == simboloJugador && tablaJugadores[2] == simboloJugador) || (tablaJugadores[3] == simboloJugador && tablaJugadores[4] == simboloJugador && tablaJugadores[5] == simboloJugador) || (tablaJugadores[6] == simboloJugador && tablaJugadores[7] == simboloJugador && tablaJugadores[8] == simboloJugador) || (tablaJugadores[0] == simboloJugador && tablaJugadores[3] == simboloJugador && tablaJugadores[6] == simboloJugador) || (tablaJugadores[1] == simboloJugador && tablaJugadores[4] == simboloJugador && tablaJugadores[7] == simboloJugador) || (tablaJugadores[2] == simboloJugador && tablaJugadores[5] == simboloJugador && tablaJugadores[8] == simboloJugador) || (tablaJugadores[0] == simboloJugador && tablaJugadores[4] == simboloJugador && tablaJugadores[8] == simboloJugador) || (tablaJugadores[2] == simboloJugador && tablaJugadores[4] == simboloJugador && tablaJugadores[6] == simboloJugador)
}
function reset() {
    contador = 0;
    tabla = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    document.querySelectorAll('.cell').forEach( x => {
        x.innerText = '';
        x.style.pointerEvents = "auto";
    });
}
function disponible(tablaJugadores) {
    return tablaJugadores.filter(x => x != human && x != ai);
}
function minimax(tablaJugadores, simboloJugador) {
    var dis = disponible(tablaJugadores);
    if(vericarGanar(tablaJugadores, human)) {
        return {
            estado: -1
        };
    }
    else if(vericarGanar(tablaJugadores, ai)) {
        return {
            estado: 1
        };
    }
    else if(dis.length == 0) {
        return {
            estado: 0
        };
    }
    var movim = [];
    for(var i = 0; i < dis.length; i++) {
        var move = {
            index: tablaJugadores[dis[i]]
        };
        tablaJugadores[dis[i]] = simboloJugador;
        var mm;
        if(simboloJugador == ai)
            mm = minimax(tablaJugadores, human);
        else
            mm = minimax(tablaJugadores, ai);
        move.estado = mm.estado;
        tablaJugadores[dis[i]] = move.index;
        movim.push(move);
    }
    var mejorMovi, mejorEstado;
    if(simboloJugador == ai) {
        mejorEstado = -10;
        for(var i = 0; i < movim.length; i++) {
            if(movim[i].estado > mejorEstado) {
                mejorEstado = movim[i].estado;
                mejorMovi = i;
            }
        }
    }
    else {
        mejorEstado = 10;
        for(var i = 0; i < movim.length; i++) {
            if(movim[i].estado < mejorEstado) {
                mejorEstado = movim[i].estado;
                mejorMovi = i;
            }
        }
    }
    return movim[mejorMovi];
}