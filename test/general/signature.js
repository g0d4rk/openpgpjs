var unit = require('../unit.js');

unit.register("Signature testing", function() {
  var openpgp = require('openpgp');

      var priv_key_arm1 =
        [ '-----BEGIN PGP PRIVATE KEY BLOCK-----',
          'Version: GnuPG v1.4.11 (GNU/Linux)',
          '',
          'lQHhBFERnrMRBADmM0hIfkI3yosjgbWo9v0Lnr3CCE+8KsMszgVS+hBu0XfGraKm',
          'ivcA2aaJimHqVYOP7gEnwFAxHBBpeTJcu5wzCFyJwEYqVeS3nnaIhBPplSF14Duf',
          'i6bB9RV7KxVAg6aunmM2tAutqC+a0y2rDaf7jkJoZ9gWJe2zI+vraD6fiwCgxvHo',
          '3IgULB9RqIqpLoMgXfcjC+cD/1jeJlKRm+n71ryYwT/ECKsspFz7S36z6q3XyS8Q',
          'QfrsUz2p1fbFicvJwIOJ8B20J/N2/nit4P0gBUTUxv3QEa7XCM/56/xrGkyBzscW',
          'AzBoy/AK9K7GN6z13RozuAS60F1xO7MQc6Yi2VU3eASDQEKiyL/Ubf/s/rkZ+sGj',
          'yJizBACtwCbQzA+z9XBZNUat5NPgcZz5Qeh1nwF9Nxnr6pyBv7tkrLh/3gxRGHqG',
          '063dMbUk8pmUcJzBUyRsNiIPDoEUsLjY5zmZZmp/waAhpREsnK29WLCbqLdpUors',
          'c1JJBsObkA1IM8TZY8YUmvsMEvBLCCanuKpclZZXqeRAeOHJ0v4DAwK8WfuTe5B+',
          'M2BOOeZbN8BpfiA1l//fMMHLRS3UvbLBv4P1+4SyvhyYTR7M76Q0xPc03MFOWHL+',
          'S9VumbQWVGVzdDIgPHRlc3QyQHRlc3QuY29tPohiBBMRAgAiBQJREZ6zAhsDBgsJ',
          'CAcDAgYVCAIJCgsEFgIDAQIeAQIXgAAKCRARJ5QDyxae+MXNAKCzWSDR3tMrTrDb',
          'TAri73N1Xb3j1ACfSl9y+SAah2q7GvmiR1+6+/ekqJGdAVgEURGesxAEANlpMZjW',
          '33jMxlKHDdyRFXtKOq8RreXhq00plorHbgz9zFEWm4VF53+E/KGnmHGyY5Cy8TKy',
          'ZjaueZZ9XuG0huZg5If68irFfNZtxdA26jv8//PdZ0Uj+X6J3RVa2peMLDDswTYL',
          'OL1ZO1fxdtDD40fdAiIZ1QyjwEG0APtz41EfAAMFBAC5/dtgBBPtHe8UjDBaUe4n',
          'NzHuUBBp6XE+H7eqHNFCuZAJ7yqJLGVHNIaQR419cNy08/OO/+YUQ7rg78LxjFiv',
          'CH7IzhfU+6yvELSbgRMicY6EnAP2GT+b1+MtFNa3lBGtBHcJla52c2rTAHthYZWk',
          'fT5R5DnJuQ2cJHBMS9HWyP4DAwK8WfuTe5B+M2C7a/YJSUv6SexdGCaiaTcAm6g/',
          'PvA6hw/FLzIEP67QcQSSTmhftQIwnddt4S4MyJJH3U4fJaFfYQ1zCniYJohJBBgR',
          'AgAJBQJREZ6zAhsMAAoJEBEnlAPLFp74QbMAn3V4857xwnO9/+vzIVnL93W3k0/8',
          'AKC8omYPPomN1E/UJFfXdLDIMi5LoA==',
          '=LSrW',
          '-----END PGP PRIVATE KEY BLOCK-----'
        ].join("\n");
    var pub_key_arm1 = 
        [ '-----BEGIN PGP PUBLIC KEY BLOCK-----',
          'Version: GnuPG v1.4.11 (GNU/Linux)',
          '',
          'mQGiBFERlw4RBAD6Bmcf2w1dtUmtCLkdxeqZLArk3vYoQAjdibxA3gXVyur7fsWb',
          'ro0jVbBHqOCtC6jDxE2l52NP9+tTlWeVMaqqNvUE47LSaPq2DGI8Wx1Rj6bF3mTs',
          'obYEwhGbGh/MhJnME9AHODarvk8AZbzo0+k1EwrBWF6dTUBPfqO7rGU2ewCg80WV',
          'x5pt3evj8rRK3jQ8SMKTNRsD/1PhTdxdZTdXARAFzcW1VaaruWW0Rr1+XHKKwDCz',
          'i7HE76SO9qjnQfZCZG75CdQxI0h8GFeN3zsDqmhob2iSz2aJ1krtjM+iZ1FBFd57',
          'OqCV6wmk5IT0RBN12ZzMS19YvzN/ONXHrmTZlKExd9Mh9RKLeVNw+bf6JsKQEzcY',
          'JzFkBACX9X+hDYchO/2hiTwx4iOO9Fhsuh7eIWumB3gt+aUpm1jrSbas/QLTymmk',
          'uZuQVXI4NtnlvzlNgWv4L5s5RU5WqNGG7WSaKNdcrvJZRC2dgbUJt04J5CKrWp6R',
          'aIYal/81Ut1778lU01PEt563TcQnUBlnjU5OR25KhfSeN5CZY7QUVGVzdCA8dGVz',
          'dEB0ZXN0LmNvbT6IYgQTEQIAIgUCURGXDgIbAwYLCQgHAwIGFQgCCQoLBBYCAwEC',
          'HgECF4AACgkQikDlZK/UvLSspgCfcNaOpTg1W2ucR1JwBbBGvaERfuMAnRgt3/rs',
          'EplqEakMckCtikEnpxYe',
          '=b2Ln',
          '-----END PGP PUBLIC KEY BLOCK-----'
        ].join("\n");
    var msg_arm1 =
        [ '-----BEGIN PGP MESSAGE-----',
          'Version: GnuPG v1.4.11 (GNU/Linux)',
          '',
          'hQEOA1N4OCSSjECBEAP/diDJCQn4e88193PgqhbfAkohk9RQ0v0MPnXpJbCRTHKO',
          '8r9nxiAr/TQv4ZOingXdAp2JZEoE9pXxZ3r1UWew04czxmgJ8FP1ztZYWVFAWFVi',
          'Tj930TBD7L1fY/MD4fK6xjEG7z5GT8k4tn4mLm/PpWMbarIglfMopTy1M/py2cID',
          '/2Sj7Ikh3UFiG+zm4sViYc5roNbMy8ixeoKixxi99Mx8INa2cxNfqbabjblFyc0Z',
          'BwmbIc+ZiY2meRNI5y/tk0gRD7hT84IXGGl6/mH00bsX/kkWdKGeTvz8s5G8RDHa',
          'Za4HgLbXItkX/QarvRS9kvkD01ujHfj+1ZvgmOBttNfP0p8BQLIICqvg1eYD9aPB',
          '+GtOZ2F3+k5VyBL5yIn/s65SBjNO8Fqs3aL0x+p7s1cfUzx8J8a8nWpqq/qIQIqg',
          'ZJH6MZRKuQwscwH6NWgsSVwcnVCAXnYOpbHxFQ+j7RbF/+uiuqU+DFH/Rd5pik8b',
          '0Dqnp0yfefrkjQ0nuvubgB6Rv89mHpnvuJfFJRInpg4lrHwLvRwdpN2HDozFHcKK',
          'aOU=',
          '=4iGt',
          '-----END PGP MESSAGE-----'
        ].join("\n");

    var priv_key_arm2 =
      ['-----BEGIN PGP PRIVATE KEY BLOCK-----',
      'Version: GnuPG v2.0.19 (GNU/Linux)',
      'Type: RSA/RSA',
      'Pwd: hello world',
      '',
      'lQH+BFJhL04BBADclrUEDDsm0PSZbQ6pml9FpzTyXiyCyDN+rMOsy9J300Oc10kt',
      '/nyBej9vZSRcaW5VpNNj0iA+c1/w2FPf84zNsTzvDmuMaNHFUzky4/vkYuZra//3',
      '+Ri7CF8RawSYQ/4IRbC9zqdBlzniyfQOW7Dp/LYe8eibnDSrmkQem0G0jwARAQAB',
      '/gMDAu7L//czBpE40p1ZqO8K3k7UejemjsQqc7kOqnlDYd1Z6/3NEA/UM30Siipr',
      'KjdIFY5+hp0hcs6EiiNq0PDfm/W2j+7HfrZ5kpeQVxDek4irezYZrl7JS2xezaLv',
      'k0Fv/6fxasnFtjOM6Qbstu67s5Gpl9y06ZxbP3VpT62+Xeibn/swWrfiJjuGEEhM',
      'bgnsMpHtzAz/L8y6KSzViG/05hBaqrvk3/GeEA6nE+o0+0a6r0LYLTemmq6FbaA1',
      'PHo+x7k7oFcBFUUeSzgx78GckuPwqr2mNfeF+IuSRnrlpZl3kcbHASPAOfEkyMXS',
      'sWGE7grCAjbyQyM3OEXTSyqnehvGS/1RdB6kDDxGwgE/QFbwNyEh6K4eaaAThW2j',
      'IEEI0WEnRkPi9fXyxhFsCLSI1XhqTaq7iDNqJTxE+AX2b9ZuZXAxI3Tc/7++vEyL',
      '3p18N/MB2kt1Wb1azmXWL2EKlT1BZ5yDaJuBQ8BhphM3tCRUZXN0IE1jVGVzdGlu',
      'Z3RvbiA8dGVzdEBleGFtcGxlLmNvbT6IuQQTAQIAIwUCUmEvTgIbLwcLCQgHAwIB',
      'BhUIAgkKCwQWAgMBAh4BAheAAAoJEEpjYTpNbkCUMAwD+gIK08qpEZSVas9qW+Ok',
      '32wzNkwxe6PQgZwcyBqMQYZUcKagC8+89pMQQ5sKUGvpIgat42Tf1KLGPcvG4cDA',
      'JZ6w2PYz9YHQqPh9LA+PAnV8m25TcGmKcKgvFUqQ3U53X/Y9sBP8HooRqfwwHcv9',
      'pMgQmojmNbI4VHydRqIBePawnQH+BFJhL04BBADpH8+0EVolpPiOrXTKoBKTiyrB',
      'UyxzodyJ8zmVJ3HMTEU/vidpQwzISwoc/ndDFMXQauq6xqBCD9m2BPQI3UdQzXnb',
      'LsAI52nWCIqOkzM5NAKWoKhyXK9Y4UH4v9LAYQgl/stIISvCgG4mJ8lzzEBWvRdf',
      'Qm2Ghb64/3V5NDdemwARAQAB/gMDAu7L//czBpE40iPcpLzL7GwBbWFhSWgSLy53',
      'Md99Kxw3cApWCok2E8R9/4VS0490xKZIa5y2I/K8thVhqk96Z8Kbt7MRMC1WLHgC',
      'qJvkeQCI6PrFM0PUIPLHAQtDJYKtaLXxYuexcAdKzZj3FHdtLNWCooK6n3vJlL1c',
      'WjZcHJ1PH7USlj1jup4XfxsbziuysRUSyXkjn92GZLm+64vCIiwhqAYoizF2NHHG',
      'hRTN4gQzxrxgkeVchl+ag7DkQUDANIIVI+A63JeLJgWJiH1fbYlwESByHW+zBFNt',
      'qStjfIOhjrfNIc3RvsggbDdWQLcbxmLZj4sB0ydPSgRKoaUdRHJY0S4vp9ouKOtl',
      '2au/P1BP3bhD0fDXl91oeheYth+MSmsJFDg/vZJzCJhFaQ9dp+2EnjN5auNCNbaI',
      'beFJRHFf9cha8p3hh+AK54NRCT++B2MXYf+TPwqX88jYMBv8kk8vYUgo8128r1zQ',
      'EzjviQE9BBgBAgAJBQJSYS9OAhsuAKgJEEpjYTpNbkCUnSAEGQECAAYFAlJhL04A',
      'CgkQ4IT3RGwgLJe6ogQA2aaJEIBIXtgrs+8WSJ4k3DN4rRXcXaUZf667pjdD9nF2',
      '3BzjFH6Z78JIGaxRHJdM7b05aE8YuzM8f3NIlT0F0OLq/TI2muYU9f/U2DQBuf+w',
      'KTB62+PELVgi9MsXC1Qv/u/o1LZtmmxTFFOD35xKsxZZI2OJj2pQpqObW27M8Nlc',
      'BQQAw2YA3fFc38qPK+PY4rZyTRdbvjyyX+1zeqIo8wn7QCQwXs+OGaH2fGoT35AI',
      'SXuqKcWqoEuO7OBSEFThCXBfUYMC01OrqKEswPm/V3zZkLu01q12UMwZach28QwK',
      '/YZly4ioND2tdazj17u2rU2dwtiHPe1iMqGgVMoQirfLc+k=',
      '=lw5e',
      '-----END PGP PRIVATE KEY BLOCK-----'].join('\n');

    var pub_key_arm2 = 
     ['-----BEGIN PGP PUBLIC KEY BLOCK-----',
      'Version: GnuPG v2.0.19 (GNU/Linux)',
      'Type: RSA/RSA',
      '',
      'mI0EUmEvTgEEANyWtQQMOybQ9JltDqmaX0WnNPJeLILIM36sw6zL0nfTQ5zXSS3+',
      'fIF6P29lJFxpblWk02PSID5zX/DYU9/zjM2xPO8Oa4xo0cVTOTLj++Ri5mtr//f5',
      'GLsIXxFrBJhD/ghFsL3Op0GXOeLJ9A5bsOn8th7x6JucNKuaRB6bQbSPABEBAAG0',
      'JFRlc3QgTWNUZXN0aW5ndG9uIDx0ZXN0QGV4YW1wbGUuY29tPoi5BBMBAgAjBQJS',
      'YS9OAhsvBwsJCAcDAgEGFQgCCQoLBBYCAwECHgECF4AACgkQSmNhOk1uQJQwDAP6',
      'AgrTyqkRlJVqz2pb46TfbDM2TDF7o9CBnBzIGoxBhlRwpqALz7z2kxBDmwpQa+ki',
      'Bq3jZN/UosY9y8bhwMAlnrDY9jP1gdCo+H0sD48CdXybblNwaYpwqC8VSpDdTndf',
      '9j2wE/weihGp/DAdy/2kyBCaiOY1sjhUfJ1GogF49rC4jQRSYS9OAQQA6R/PtBFa',
      'JaT4jq10yqASk4sqwVMsc6HcifM5lSdxzExFP74naUMMyEsKHP53QxTF0Grqusag',
      'Qg/ZtgT0CN1HUM152y7ACOdp1giKjpMzOTQClqCoclyvWOFB+L/SwGEIJf7LSCEr',
      'woBuJifJc8xAVr0XX0JthoW+uP91eTQ3XpsAEQEAAYkBPQQYAQIACQUCUmEvTgIb',
      'LgCoCRBKY2E6TW5AlJ0gBBkBAgAGBQJSYS9OAAoJEOCE90RsICyXuqIEANmmiRCA',
      'SF7YK7PvFkieJNwzeK0V3F2lGX+uu6Y3Q/Zxdtwc4xR+me/CSBmsURyXTO29OWhP',
      'GLszPH9zSJU9BdDi6v0yNprmFPX/1Ng0Abn/sCkwetvjxC1YIvTLFwtUL/7v6NS2',
      'bZpsUxRTg9+cSrMWWSNjiY9qUKajm1tuzPDZXAUEAMNmAN3xXN/Kjyvj2OK2ck0X',
      'W748sl/tc3qiKPMJ+0AkMF7Pjhmh9nxqE9+QCEl7qinFqqBLjuzgUhBU4QlwX1GD',
      'AtNTq6ihLMD5v1d82ZC7tNatdlDMGWnIdvEMCv2GZcuIqDQ9rXWs49e7tq1NncLY',
      'hz3tYjKhoFTKEIq3y3Pp',
      '=h/aX',
      '-----END PGP PUBLIC KEY BLOCK-----'].join('\n');

var pub_key_arm3 =
      ['-----BEGIN PGP PUBLIC KEY BLOCK-----',
      'Version: GnuPG v2.0.19 (GNU/Linux)',
      '',
      'mQENBFKV0FUBCACtZliApy01KBGbGNB36YGH4lpr+5KoqF1I8A5IT0YeNjyGisOk',
      'WsDsUzOqaNvgzQ82I3MY/jQV5rLBhH/6LiRmCA16WkKcqBrHfNGIxJ+Q+ofVBHUb',
      'aS9ClXYI88j747QgWzirnLuEA0GfilRZcewII1pDA/G7+m1HwV4qHsPataYLeboq',
      'hPA3h1EVVQFMAcwlqjOuS8+weHQRfNVRGQdRMm6H7166PseDVRUHdkJpVaKFhptg',
      'rDoNI0lO+UujdqeF1o5tVZ0j/s7RbyBvdLTXNuBbcpq93ceSWuJPZmi1XztQXKYe',
      'y0f+ltgVtZDEc7TGV5WDX9erRECCcA3+s7J3ABEBAAG0G0pTIENyeXB0byA8ZGlm',
      'ZmllQGhvbWUub3JnPokBPwQTAQIAKQUCUpXQVQIbAwUJCWYBgAcLCQgHAwIBBhUI',
      'AgkKCwQWAgMBAh4BAheAAAoJENvyI+hwU030yRAIAKX/mGEgi/miqasbbQoyK/CS',
      'a7sRxgZwOWQLdi2xxpE5V4W4HJIDNLJs5vGpRN4mmcNK2fmJAh74w0PskmVgJEhP',
      'dFJ14UC3fFPq5nbqkBl7hU0tDP5jZxo9ruQZfDOWpHKxOCz5guYJ0CW97bz4fChZ',
      'NFDyfU7VsJQwRIoViVcMCipP0fVZQkIhhwpzQpmVmN8E0a6jWezTZv1YpMdlzbEf',
      'H79l3StaOh9/Un9CkIyqEWdYiKvIYms9nENyehN7r/OKYN3SW+qlt5GaL+ws+N1w',
      '6kEZjPFwnsr+Y4A3oHcAwXq7nfOz71USojSmmo8pgdN8je16CP98vw3/k6TncLS5',
      'AQ0EUpXQVQEIAMEjHMeqg7B04FliUFWr/8C6sJDb492MlGAWgghIbnuJfXAnUGdN',
      'oAzn0S+n93Y/qHbW6YcjHD4/G+kK3MuxthAFqcVjdHZQXK0rkhXO/u1co7v1cdtk',
      'OTEcyOpyLXolM/1S2UYImhrml7YulTHMnWVja7xu6QIRso+7HBFT/u9D47L/xXrX',
      'MzXFVZfBtVY+yoeTrOY3OX9cBMOAu0kuN9eT18Yv2yi6XMzP3iONVHtl6HfFrAA7',
      'kAtx4ne0jgAPWZ+a8hMy59on2ZFs/AvSpJtSc1kw/vMTWkyVP1Ky20vAPHQ6Ej5q',
      '1NGJ/JbcFgolvEeI/3uDueLjj4SdSIbLOXMAEQEAAYkBJQQYAQIADwUCUpXQVQIb',
      'DAUJCWYBgAAKCRDb8iPocFNN9NLkB/wO4iRxia0zf4Kw2RLVZG8qcuo3Bw9UTXYY',
      'lI0AutoLNnSURMLLCq6rcJ0BCXGj/2iZ0NBxZq3t5vbRh6uUv+hpiSxK1nF7AheN',
      '4aAAzhbWx0UDTF04ebG/neE4uDklRIJLhif6+Bwu+EUeTlGbDj7fqGSsNe8g92w7',
      '1e41rF/9CMoOswrKgIjXAou3aexogWcHvKY2D+1q9exORe1rIa1+sUGl5PG2wsEs',
      'znN6qtN5gMlGY1ofWDY+I02gO4qzaZ/FxRZfittCw7v5dmQYKot9qRi2Kx3Fvw+h',
      'ivFBpC4TWgppFBnJJnAsFXZJQcejMW4nEmOViRQXY8N8PepQmgsu',
      '=ummy',
      '-----END PGP PUBLIC KEY BLOCK-----'].join('\n');

var pub_revoked =
      ['-----BEGIN PGP PUBLIC KEY BLOCK-----',
      'Version: GnuPG v2.0.19 (GNU/Linux)',
      '',
      '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',
      'pMiJM+NJAQ==',
      '=ok+o',
      '-----END PGP PUBLIC KEY BLOCK-----'].join('\n');


  var tests = [function() {
    var priv_key = openpgp.key.readArmored(priv_key_arm1).packets;
    var pub_key = openpgp.key.readArmored(pub_key_arm1).packets;
    var msg = openpgp.message.readArmored(msg_arm1).packets;
    //TODO need both?
    priv_key[0].decrypt("abcd");
    priv_key[3].decrypt("abcd");
    msg[0].decrypt(priv_key[3]);
    msg[1].decrypt(msg[0].sessionKeyAlgorithm, msg[0].sessionKey);
    msg[1].packets[2].verify(pub_key[0], msg[1].packets[1]);
    return new unit.result("Testing signature checking on CAST5-enciphered message",
            msg[1].packets[2].verified === true);

  }, function() {

    // exercises the GnuPG s2k type 1001 extension:
    // the secrets on the primary key have been stripped.
    var priv_key_gnupg_ext = openpgp.key.readArmored([
          '-----BEGIN PGP PRIVATE KEY BLOCK-----',
          'Version: GnuPG v1.4.11 (GNU/Linux)',
          '',
          'lQGqBFERnrMRBADmM0hIfkI3yosjgbWo9v0Lnr3CCE+8KsMszgVS+hBu0XfGraKm',
          'ivcA2aaJimHqVYOP7gEnwFAxHBBpeTJcu5wzCFyJwEYqVeS3nnaIhBPplSF14Duf',
          'i6bB9RV7KxVAg6aunmM2tAutqC+a0y2rDaf7jkJoZ9gWJe2zI+vraD6fiwCgxvHo',
          '3IgULB9RqIqpLoMgXfcjC+cD/1jeJlKRm+n71ryYwT/ECKsspFz7S36z6q3XyS8Q',
          'QfrsUz2p1fbFicvJwIOJ8B20J/N2/nit4P0gBUTUxv3QEa7XCM/56/xrGkyBzscW',
          'AzBoy/AK9K7GN6z13RozuAS60F1xO7MQc6Yi2VU3eASDQEKiyL/Ubf/s/rkZ+sGj',
          'yJizBACtwCbQzA+z9XBZNUat5NPgcZz5Qeh1nwF9Nxnr6pyBv7tkrLh/3gxRGHqG',
          '063dMbUk8pmUcJzBUyRsNiIPDoEUsLjY5zmZZmp/waAhpREsnK29WLCbqLdpUors',
          'c1JJBsObkA1IM8TZY8YUmvsMEvBLCCanuKpclZZXqeRAeOHJ0v4DZQJHTlUBtBZU',
          'ZXN0MiA8dGVzdDJAdGVzdC5jb20+iGIEExECACIFAlERnrMCGwMGCwkIBwMCBhUI',
          'AgkKCwQWAgMBAh4BAheAAAoJEBEnlAPLFp74xc0AoLNZINHe0ytOsNtMCuLvc3Vd',
          'vePUAJ9KX3L5IBqHarsa+aJHX7r796SokZ0BWARREZ6zEAQA2WkxmNbfeMzGUocN',
          '3JEVe0o6rxGt5eGrTSmWisduDP3MURabhUXnf4T8oaeYcbJjkLLxMrJmNq55ln1e',
          '4bSG5mDkh/ryKsV81m3F0DbqO/z/891nRSP5fondFVral4wsMOzBNgs4vVk7V/F2',
          '0MPjR90CIhnVDKPAQbQA+3PjUR8AAwUEALn922AEE+0d7xSMMFpR7ic3Me5QEGnp',
          'cT4ft6oc0UK5kAnvKoksZUc0hpBHjX1w3LTz847/5hRDuuDvwvGMWK8IfsjOF9T7',
          'rK8QtJuBEyJxjoScA/YZP5vX4y0U1reUEa0EdwmVrnZzatMAe2FhlaR9PlHkOcm5',
          'DZwkcExL0dbI/gMDArxZ+5N7kH4zYLtr9glJS/pJ7F0YJqJpNwCbqD8+8DqHD8Uv',
          'MgQ/rtBxBJJOaF+1AjCd123hLgzIkkfdTh8loV9hDXMKeJgmiEkEGBECAAkFAlER',
          'nrMCGwwACgkQESeUA8sWnvhBswCfdXjznvHCc73/6/MhWcv3dbeTT/wAoLyiZg8+',
          'iY3UT9QkV9d0sMgyLkug',
          '=GQsY',
          '-----END PGP PRIVATE KEY BLOCK-----',
        ].join("\n")).packets;
    var pub_key = openpgp.key.readArmored(pub_key_arm1).packets;
    var msg = openpgp.message.readArmored(msg_arm1).packets;

    priv_key_gnupg_ext[3].decrypt("abcd");
    msg[0].decrypt(priv_key_gnupg_ext[3]);
    msg[1].decrypt(msg[0].sessionKeyAlgorithm, msg[0].sessionKey);
    msg[1].packets[2].verify(pub_key[0], msg[1].packets[1]);
    return new unit.result("Testing GnuPG stripped-key extensions",
            msg[1].packets[2].verified === true);

  }, function() {

    var signedArmor = 
       ['-----BEGIN PGP MESSAGE-----',
        'Version: GnuPG v2.0.19 (GNU/Linux)',
        '',
        'owGbwMvMwMT4oOW7S46CznTGNeZJLCWpFSVBU3ZGF2fkF5Uo5KYWFyemp3LlAUUV',
        'cjLzUrneTp3zauvaN9O26L9ZuOFNy4LXyydwcXXMYWFgZGJgY2UCaWXg4hSAmblK',
        'nPmfsXYxd58Ka9eVrEnSpzilr520fXBrJsf2P/oTqzTj3hzyLG0o3TTzxFfrtOXf',
        'cw6U57n3/Z4X0pEZ68C5/o/6NpPICD7fuEOz3936raZ6wXGzueY8pfPnVjY0ajAc',
        'PtJzvvqj+ubYaT1sK9wWhd9lL3/V+9Zuua9QjOWC22buchsCroh8fLoZAA==',
        '=VH8F',
        '-----END PGP MESSAGE-----'].join('\n');

    var sMsg = openpgp.message.readArmored(signedArmor).packets;
    var pub_key = openpgp.key.readArmored(pub_key_arm2).packets;
    sMsg[0].packets[2].verify(pub_key[3], sMsg[0].packets[1]);
    return new unit.result("Verify V4 signature. Hash: SHA1. PK: RSA. Signature Type: 0x00 (binary document)", sMsg[0].packets[2].verified);
  }, function() {

    var signedArmor = 
       ['-----BEGIN PGP MESSAGE-----',
        'Version: GnuPG v2.0.19 (GNU/Linux)',
        '',
        'owGbwMvMyMj4oOW7S46CznTG09YlLCWpFSVBU47xFGfkF5Uo5KYWFyemp/Jy5QGF',
        'FXIy84DMt1PnvNq69s20LfpvFm5407Lg9fIJvFy8XJ0MU5lZGUFa4eYxxiQz/6+/',
        'aFt4/6+e76O6s1afLi65emmK9xsdh7Mr60UnT2UN0LwocWnT7t/nOMJubnypvzTu',
        'aPJyvm9TTpobW/O+P1n2THLS4UCvWt12Oa2lJ04GLwk/bDF1u+8ZpfPCpsxLVzcs',
        'ZGtbq/f23XxV/jkL47hr3s3Ic4yoZTW4oZO27GYf37TPp9L3VboCAA==',
        '=pa6B',
        '-----END PGP MESSAGE-----'].join('\n');

    var sMsg = openpgp.message.readArmored(signedArmor).packets;
    var pub_key = openpgp.key.readArmored(pub_key_arm2).packets;
    sMsg[0].packets[2].verify(pub_key[3], sMsg[0].packets[1]);
    return new unit.result("Verify V3 signature. Hash: MD5. PK: RSA. Signature Type: 0x01 (text document)", sMsg[0].packets[2].verified);
  }, function() {

    var msg_armor = 
       ['-----BEGIN PGP MESSAGE-----',
        'Version: GnuPG v2.0.19 (GNU/Linux)',
        '',
        'hIwD4IT3RGwgLJcBBADEBdm+GEW7IV1K/Bykg0nB0WYO08ai7/8/+Y/O9xu6RiU0',
        'q7/jWuKms7kSjw9gxMCjf2dGnAuT4Cg505Kj5WfeBuHh618ovO8qo4h0qHyp1/y3',
        'o1P0IXPAb+LGJOeO7DyM9Xp2AOBiIKOVWzFTg+MBZOc+XZEVx3FioHfm9SSDudLA',
        'WAEkDakCG6MRFj/7SmOiV8mQKH+YPMKT69eDZW7hjINabrpM2pdRU7c9lC7CMUBx',
        'Vj7wZsQBMASSC8f2rhpGA2iKvYMsmW3g9R1xkvj1MXWftSPUS4jeNTAgEwvvF6Af',
        'cP+OYSXKlTbwfEr73ES2O3/IFE9sHRjPqWaxWuv4DDQ5YfIxE54C1aE8Aq5/QaIH',
        'v38TUSia0yEMCc/tJd58DikkT07AF162tcx9Ro0ZjhudyuvUyXIfPfxA+XWR2pdz',
        'ifxyV4zia9RvaCUY8vXGM+gQJ3NNXx2LkZA3kWUEyxFVL1Vl/XUQY0M6U+uccSk4',
        'eMXm6eyEWDcj0lBRckqKoKo1w/uan11jPuHsnRz6jO9DsuKEz79UDgI=',
        '=cFi7',
        '-----END PGP MESSAGE-----'].join('\n');

    var plaintext = 'short message\nnext line\n한국어/조선말';
    var esMsg = openpgp.message.readArmored(msg_armor);
    var pubKey = openpgp.key.readArmored(pub_key_arm2);
    var privKey = openpgp.key.readArmored(priv_key_arm2);

    var keyids = esMsg.getEncryptionKeyIds();
    privKey.decryptKeyPacket(keyids, 'hello world');

    var decrypted = openpgp.decryptAndVerifyMessage(privKey, [pubKey], esMsg);
    var verified = decrypted.text == plaintext && decrypted.signatures[0].valid;

    return new unit.result("Verify signature of signed and encrypted message from GPG2 with openpgp.decryptAndVerifyMessage", verified);
  }, function() {

    var msg_armor = 
      ['-----BEGIN PGP MESSAGE-----',
      'Version: Encryption Desktop 10.3.0 (Build 9307)',
      'Charset: utf-8',
      '',
      'qANQR1DBjAPghPdEbCAslwED/2S4oNvCjO5TdLUMMUuVOQc8fi6c5XIBu7Y09fEX',
      'Jm/UrkDHVgmPojLGBDF0CYENNZOVrNfpahY7A3r4HPzGucBzCO1uxuUIKjhtNAAM',
      'mjD939ernjooOZrM6xDuRaX8adG0LSxpNaVJGxXd/EdlmKDJbYDI6aJ5INrUxzAR',
      'DAqw0sBSAXgRWgiH6IIiAo5y5WFEDEN9sGStaEQT2wd32kX73M4iZuMt/GM2agiB',
      'sWb7yLcNHiJ/3OnTfDg9+T543kFq9FlwFbwqygO/wm9e/kgMBq0ZsFOfV+GRtXep',
      '3qNbJsmzGvdqiUHb/+hkdE191jaSVcO/zaMW4N0Vc1IwIEhZ8I9+9bKwusdVhHT5',
      'MySnhIogv+0Ilag/aY+UiCt+Zcie69T7Eix48fC/VVW5w3INf1T2CMmDm5ZLZFRN',
      'oyqzb9Vsgu1gS7SCb6qTbnbV9PlSyU4wJB6siX8hz/U0urokT5se3uYRjiV0KbkA',
      'zl1/r/wCrmwX4Gl9VN9+33cQgYZAlJLsRw8N82GhbVweZS8qwv24GQ==',
      '=nx90',
      '-----END PGP MESSAGE-----'].join('\n');

    var plaintext = 'short message\nnext line\n한국어/조선말\n\n';
    var esMsg = openpgp.message.readArmored(msg_armor);
    var pubKey = openpgp.key.readArmored(pub_key_arm2);
    var privKey = openpgp.key.readArmored(priv_key_arm2);

    var keyids = esMsg.getEncryptionKeyIds();
    privKey.decryptKeyPacket(keyids, 'hello world');

    var decrypted = openpgp.decryptAndVerifyMessage(privKey, [pubKey], esMsg);
    var verified = decrypted.text == plaintext && decrypted.signatures[0].valid;

    return new unit.result("Verify signature of signed and encrypted message from PGP 10.3.0 with openpgp.decryptAndVerifyMessage", verified);
  }, function() {

    var msg_armor = 
     ['-----BEGIN PGP MESSAGE-----',
      'Version: GnuPG v2.0.19 (GNU/Linux)',
      '',
      'owGbwMvMwMF4+5Pyi4Jg3y8ME8DcBy3fXXIUdKYzrjFNYilJrSgJmsXDXJyRX1Si',
      'kJtaXJyYnsqVBxRVyMnMS+V6O3XOq61r30zbov9m4YY3LQteL5/QMYeFgZGDgY2V',
      'CaSRgYtTAGZiYxYLwySbQk07ptZel6gmjrKyBWsyWdkOG3oscLBdIpXXfDdb6fNv',
      '8ULN5L1ed+xNo79P2dBotWud6vn7e9dtLJ7o12PunnvEz8gyyvP4/As/los0xsnZ',
      'H+8ublrhvGtLxJUZuUKZO6QdHq2Nepuw8OrfiMXPBDQXXpV2q11Ze+rD3lndgv/C',
      'bJQNOhll0J0H839jFvt/16m20h/ZmDoWqJywapnypjdIjcXr+7rJFess40yenV7Q',
      '2LSu/EX6Aq29x+dv+GPUMfuhTNE3viWWUR4PD6T7XfmdViUwmSf8fkRNUn/t3a2n',
      'cq46Xr36seCor/OLp0atSZwHrjx2SU5zPLheZn+zw/0d1/YZnD7AEeP9s/Cuycyv',
      'CZ5HZNKufvB8fsh+dfdSXW0GfqkPfxk36Vw8ufpjaoZDyt2nxxg/6D4KS3UvZzv3',
      'axdLZ9yd0OJNZv4P501If24W4vTGz6nI7Ser8Yd2PiOvE5MWMT0wLZQ+zPX1sv0/',
      's8PvkyWmVM0O0fB/ZSHovHNNPffDg/rWhzOmXQ9/7vTn477F+aWm5sYzJ75/BQA=',
      '=+L0S',
      '-----END PGP MESSAGE-----'].join('\n');

    var plaintext = 'short message\nnext line\n한국어/조선말';
    var sMsg = openpgp.message.readArmored(msg_armor);
    var pubKey2 = openpgp.key.readArmored(pub_key_arm2);
    var pubKey3 = openpgp.key.readArmored(pub_key_arm3);

    var keyids = sMsg.getSigningKeyIds();

    var verified = pubKey2.getPublicKeyPacket(keyids) !== null && pubKey3.getPublicKeyPacket(keyids) !== null;

    verified = verified && sMsg.getText() == plaintext;

    var verifiedSig = sMsg.verify([pubKey2, pubKey3]);
    
    verified = verified && verifiedSig[0].valid && verifiedSig[1].valid;

    return new unit.result("Verify signed message with two one pass signatures", verified);
  }, function() {

    var msg_armor = 
     ['-----BEGIN PGP SIGNED MESSAGE-----',
      'Hash: SHA256',
      '',
      'short message',
      'next line',
      '한국어/조선말',
      '-----BEGIN PGP SIGNATURE-----',
      'Version: GnuPG v2.0.19 (GNU/Linux)',
      '',
      'iJwEAQEIAAYFAlKcju8ACgkQ4IT3RGwgLJci6gP/dCmIraUa6AGpJxzGfK+jYpjl',
      'G0KunFyGmyPxeJVnPi2bBp3EPIbiayQ71CcDe9DKpF046tora07AA9eo+/YbvJ9P',
      'PWeScw3oj/ejsmKQoDBGzyDMFUphevnhgc5lENjovJqmiu6FKjNmADTxcZ/qFTOq',
      '44EWTgdW3IqXFkNpKjeJARwEAQEIAAYFAlKcju8ACgkQ2/Ij6HBTTfQi6gf9HxhE',
      'ycLDhQ8iyC090TaYwsDytScU2vOMiI5rJCy2tfDV0pfn+UekYGMnKxZTpwtmno1j',
      'mVOlieENszz5IcehS5TYwk4lmRFjoba+Z8qwPEYhYxP29GMbmRIsH811sQHFTigo',
      'LI2t4pSSSUpAiXd9y6KtvkWcGGn8IfkNHCEHPh1ov28QvH0+ByIiKYK5N6ZB8hEo',
      '0uMYhKQPVJdPCvMkAxQCRPw84EvmxuJ0HMCeSB9tHQXpz5un2m8D9yiGpBQPnqlW',
      'vCCq7fgaUz8ksxvQ9bSwv0iIIbbBdTP7Z8y2c1Oof6NDl7irH+QCeNT7IIGs8Smn',
      'BEzv/FqkQAhjy3Krxg==',
      '=3Pkl',
      '-----END PGP SIGNATURE-----'].join('\n');

    var plaintext = 'short message\nnext line\n한국어/조선말';
    var csMsg = openpgp.cleartext.readArmored(msg_armor);
    var pubKey2 = openpgp.key.readArmored(pub_key_arm2);
    var pubKey3 = openpgp.key.readArmored(pub_key_arm3);

    var keyids = csMsg.getSigningKeyIds();

    var verified = pubKey2.getPublicKeyPacket(keyids) !== null && pubKey3.getPublicKeyPacket(keyids) !== null;

    var cleartextSig = openpgp.verifyClearSignedMessage([pubKey2, pubKey3], csMsg);

    verified = verified && cleartextSig.text == plaintext;

    verified = verified && cleartextSig.signatures[0].valid && cleartextSig.signatures[1].valid;

    return new unit.result("Verify cleartext signed message with two signatures with openpgp.verifyClearSignedMessage", verified);
  }, function() {

    var plaintext = 'short message\nnext line\n한국어/조선말';
    var pubKey = openpgp.key.readArmored(pub_key_arm2);
    var privKey = openpgp.key.readArmored(priv_key_arm2);
    privKey.getSigningKeyPacket().decrypt('hello world');

    var clearSignedArmor = openpgp.signClearMessage([privKey], plaintext);

    var csMsg = openpgp.cleartext.readArmored(clearSignedArmor);
    
    var cleartextSig = openpgp.verifyClearSignedMessage([pubKey], csMsg);

    var verified = cleartextSig.text == plaintext.replace(/\r/g,'');

    verified = verified && cleartextSig.signatures[0].valid;

    return new unit.result("Sign text with openpgp.signClearMessage and verify with openpgp.verifyClearSignedMessage leads to same cleartext and valid signatures", verified);
  }, function() {

    var pubKey = openpgp.key.readArmored(pub_revoked);

    var verified = pubKey.packets[1].verify(pubKey.packets[0], {key: pubKey.packets[0]});

    return new unit.result("Verify revocation signature", verified);
  }, function() {

    var pubKey = openpgp.key.readArmored(pub_revoked);

    var verified = !pubKey.packets[4].keyNeverExpires && pubKey.packets[4].keyExpirationTime == 5*365*24*60*60;

    return new unit.result("Verify key expiration date", verified);
  }];

  var results = [];

  for(var i in tests) {
    results.push(tests[i]());
  }  
  
  return results;

});
