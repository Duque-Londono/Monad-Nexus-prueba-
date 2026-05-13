// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title NexusWorker
 * @notice Motor de calculo verificable para Monad Nexus
 * @dev Implementa la formula de Haversine para distancia geografica real
 */
contract NexusWorker {
    /**
     * @notice Calcula la distancia entre dos puntos geograficos
     * @dev Usa la formula de Haversine. Coordenadas como enteros (ej: 5.691° = 5691)
     * @param lat1 Latitud del punto 1 (multiplicada por 1000)
     * @param lng1 Longitud del punto 1 (multiplicada por 1000)
     * @param lat2 Latitud del punto 2 (multiplicada por 1000)
     * @param lng2 Longitud del punto 2 (multiplicada por 1000)
     * @return Distancia en metros
     */
    function solve(
        int256 lat1,
        int256 lng1,
        int256 lat2,
        int256 lng2
    ) public pure returns (uint256) {
        int256 R = 6371000;

        int256 dLat = _toRadians(lat2 - lat1);
        int256 dLng = _toRadians(lng2 - lng1);

        int256 a = _sinSquaredHalf(dLat) +
            (_cosRad(_toRadians(lat1)) *
                _cosRad(_toRadians(lat2)) *
                _sinSquaredHalf(dLng));

        int256 c = 2 * _atan2(_sqrt(a), _sqrt(1e18 - a));

        return uint256((R * c) / 1e18);
    }

    function _toRadians(int256 degrees) private pure returns (int256) {
        return (degrees * 3141592653589793238) / (180000 * 1000);
    }

    function _sinSquaredHalf(int256 x) private pure returns (int256) {
        int256 xSquared = (x * x) / 1e18;
        int256 sinX = x - (x * xSquared) / (6 * 1e18);
        int256 sinHalf = sinX / 2;
        return (sinHalf * sinHalf) / 1e18;
    }

    function _cosRad(int256 x) private pure returns (int256) {
        int256 xSquared = (x * x) / 1e18;
        return 1e18 - xSquared / 2;
    }

    function _sqrt(int256 y) private pure returns (int256 z) {
        if (y > 3) {
            z = y;
            int256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    function _atan2(int256 y, int256 x) private pure returns (int256) {
        if (x == 0) return 1570796326794896619;
        int256 atan = (y * 1e18) / x;
        return atan;
    }
}
