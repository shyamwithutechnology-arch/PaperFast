import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import MathJax from 'react-native-mathjax';
import RenderHtml from 'react-native-render-html';
import { moderateScale } from '../../utils/responsiveSize';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../component/header/AppHeader';

const { width } = Dimensions.get('window');

export type ChemistryDataProps = {
  navigation?: any;
}

const data = [
  {
    "questionid": 112247,
    "question": "An alcohol, \\(\\mathrm{X}\\left(\\mathrm{C}_5 \\mathrm{H}_{12} \\mathrm{O}\\right)\\) in the presence of \\(\\mathrm{Cu} \/ 573 \\mathrm{~K}\\) gives \\(\\mathrm{Y}\\left(\\mathrm{C}_5 \\mathrm{H}_{10}\\right)\\). The reactants required for the preparation of X are",
    "option1": "<img src=\"data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfEAAADXCAIAAACF0v+1AAAa9UlEQVR4nOzda4ycZfnH8Wt3Zne7BRo0MeGNhhhPEY8oBhX0laLGqlWJWg9BIxpPFdGAGqgFqyIeEDwDEkATDwkHkYoRiS+MUqtrGlO1sWl8oVFjjKGn7ezsHP7580uuXLmeZ6bbdrs7c+\/386LZ7c55nrnmeu77uq+72e\/3DQBQhMnVfgAAgGVDTAeAchDTAaAcxHQAKAcxHQDKQUwHgHIQ0wGgHMR0ACgHMR0AykFMB4ByENMBoBzEdAAoBzEdAMpBTAeAchDTAaAcxHQAKAcxHQDKQUwHgHIQ0wGgHMR0ACjHWonp\/UeZWedR8U\/dbnf1HhcALKcJRbqC6QlOTExU\/9Tr9f7\/a21yUmG90WisxgMEgGWzVvJ0AFgLys\/To3a7PT097cm78nQydADFIE8HgHI0V\/sBnHKaEW02m\/5vGl5vNBrtdtvMlMIDwPhaW2MvnU7Hw3qcI13VBwUAy4ZwBgDlKD+mLz5KPzebzVifrqL1Vqu1qg8QAJZN+TEdANaOtTKerlVF\/X5f4+lx4nT9+vUHDhwws6mpqdV+mABwUsjTAaAcayVPj4l5XG2kWkb9Wts\/AADGyFqJ6dLv96uBe3JyMoZ4ABhfjL0AQDmI6QBQDmI6AJSDmA4A5SCmA0A5iOkAUA5iOgCUg5gOAOUgpgNAOYjpAFAOYjoAlIOYDgDlIKYDQDmI6QBQDmI6AJSDmA4A5SCmA0A5iOkAUA5iOgCUg5gOAOUgpgNAOYjpAFAOYjoAlIOYDgDlIKYDQDmI6QBQDmI6AJSDmA4A5SCmA0A5iOkAUA5iOgCUg5gOAOUgpgNAOYjpAFAOYjoAlIOYDgDlIKYDQDmI6QBQDmI6AJSDmA4A5SCmA0A5mqv9AE5cv9+fmJhY4oUXFhbMbHp6Ov5nr9fT7Qy5WV1mcnLSf1imhw8Ay28iRbTy6Al6mE6\/6mf9p\/9JXwAzMzN+mV6vRzQHMPqIUwBQjjEee1kiZd8aOWk0GouLiz4Ioz81Go14+V6vFzP0TqejH5Ta69epqakVfx4AcGzk6QBQjvLz9DgOvrCwkEbJlYC3221P3nu9XkztlZ57Lk+GDmCUkacDQDnKz9Ojqampo0ePevL+jW98Q6PqR44c8ZTcM3FdxitkNBCvhJ0aGACjaYxrGf2RL6VK3UdX9uzZY2ZXX321mT3wwAMakFGkvu2228xs8+bNsbRRAzJHjx5dt27dEu8LAFYL+SYAlGO88\/TarDlm2f1+v9vtmplGVz772c9+8YtfNLNXvepVZnbVVVeZ2ZOe9KQvfOELZvaVr3zFzM455xyNybzwhS+MCb6qGJXRk60DGE3k6QBQjgLz9NjFpdfr\/fCHPzSzt7\/97frrj3\/8YzO76KKLPOluNpu68F\/+8hcz+9SnPnXXXXeZ2Tvf+U4z+8QnPmFmZ599drPZrG0tAACjY0RjerfbVdxMFSYaSPFqcY2HKNr2er0Yah966CFF5Lm5OTPbvn27mb3vfe97zGMeEztzqaBFt6Abbzab99xzj5ldf\/31ZrZz504Ny7zjHe8wszPPPFO3H+8r9YdJDzLqP8qv3uv1ai+G4eJr6C9+fE+9P088vP0tO+F2bLpir9fTAaMaqtnZ2WPe4KDGcPEyi4uLcfWDDx76M6pexROX9GFRjVa8tW63m4606mXSA0h3mo7q9HjiJ3HQo43\/ubCwoPvyywz51KQ\/VdsxIWLsBQDKMaJ5esyJ9EUdv5b1vd3r9VJasW\/fPjP70pe+ZGa33nqrmV1yySUf+chHzOzpT396zHo086nnnr7wdY9m1mq1zOyWW24xs8suu+xFL3qRmW3ZssXM3vSmN8VVpvq32+0q91HVo2dGerSS0pDjahcMTy2r2Xe73a5tpOynYrpiNTldorjSuJqHxvMGZawTExN6r4dc0m9Wj8f\/M+Wh8a7TAZOy41Tdmx5zXB3d7XZjy6NBB2G6fTM7dOjQGWecMagHdbo1P4+Jt6NqhdNOO632PU2VCOnJ6jJ6uaqPDUKeDgDlGLk83b\/bl\/7Xf\/7zn2Z2xx13fPKTnzSzc88918y2bdtmZhs3bjzmPe7bt+\/JT36y\/9rtdtMKUjPbu3fvHXfcYWbXXXedmW3atEm3\/6xnPas6NOkZRG0SlPpEHv8rtBbp5dILOz09HV9YH2zVf+q98191RWVz7XY7nlct8ciPeagPW\/vJnOh91ImdZ47pfdfhEVcjt9vt+PDm5+fXr1\/vD8yfV3zMjUYjnvb5I4yHUxoW96xfV9Sfms2mXkzdlzL6RqMRh86r58ESX\/xWq3X66af7Vfw56hnpMouLi\/GE1U+U4\/PqdDq196WrpNmCISPvIE8HgKKMXJ6eKMuYnJyMX+NKMebn5x988EEze9vb3qaU4fbbbzezt771rTFdivnI1NRUTHN++9vfmtkFF1xw2WWXmdkVV1xhZmeddVYciFTytW7dOl3x4YcfNrOPfvSju3bt0g++dumMM86IuUOn04mDfd6HXYZXCKCWZ4j6QSOzyhNTXtzpdOJ7kc6KdCzpXV6idCqmY0Pvaa\/X07ER2\/F74U3MRtPJgV\/Gj7c0Ah6Tbh9ojuUiurVWqzXkwPMD3tuO+sWq2W58mj52Xzu+rys2Go04ru3PPc42+fmHHolmg3xwPN21n2ZV34Jq6Q5qjW5M92Ba\/fVXv\/qV6gvvvvtuM\/vYxz5mZpdffvlZZ511zGGN+fl5M9NBpp9\/8pOfqE5Rx9PNN9988cUXx7uOh6mO3U6nc99995nZG97wBr\/MnXfeuWnTJr\/xIYVc0QnP2q0pqYFa9cX0QC8eLtN5epy3PIEj3+83jgakwZA0FqTjdsOGDfHXlGHUHqt+YCho6r78rqPJyUldJg3XpEMrXnF2dvbQoUN+FYV7D5r+3Vmdh2y1Wl4CoEvGOmDdzuTkpOJ++iaLH8zp6Wk9PF3SByr1NP1+H3nkkVhAHEdv4uUR8YoAQDlGNE\/3lMEnRf\/+97+b2Q033GBmN954o5m9+tWv1kqipz3tafrG9jkiT0\/8vNhnb\/y8MuYR\/\/3vf83spptu0uqk8847z8zUGebCCy\/UZWIbmW63q9s5ePCgmX3mM5\/RGqULLrjAf33JS15SXRozNTWVTrdX9WUeVzF\/TMmg3v3aU59OpxML+I7ryE8Jdcx5vadQHM1INXaNRqP25CAlwtWjIu3i0u12lSaraephTE9P6+iS6hRlnFj2JDc+Ej95TQviqvs1Vpuhxtw5lWzWdk71h+H3Ur1KbfadXgpqGQchTweAcoxcnl5bF3jTTTepTvEZz3iGmennjRs3xhbnnuakrS3in9KakZQyyN\/+9rcPfvCDZvbzn\/\/czN7ylreY2ZVXXnnOOedUH16cPtq\/f\/8HPvABv+Kll16qgf5YKOnzTkOGLDGcn2wtZXBco8ZaJuOnfRs2bIgZ\/XDV9UQ+Mat3P921Z\/QxtZ+YmIiD755lx\/d90HoiXdgvGWsifRo2zlv6jcRDq9lsHj58ONYB186RxqR7ZmYm1hfEVyNePT7m2qlgF9+pZrOpT40mun1cPrXc0GU8bU9PAbXI0wGgHCOXp0ur1frNb37j9YVzc3Ma7FadovfhitP0i4uLsVrL06K0gCi1\/dIl41ier0j+2c9+pjaNZrZ79+5rr71WXcCUpsUyGPHxR13x4x\/\/+B\/\/+EefA1BpzWMf+1i\/sO6aBRRL5xVyqUBQ711MAxuNRqqbikV+J1A\/mq4S79qPsdSNQAm13t\/Z2Vn9EBPq2rtINZHVU8x4nuc1J7ovDYun0XmvfYwnHI1GQycZuhcvrYnD4mnM3U9\/Y\/LuL3uqQUwJfny\/9G+z2dTD88Z5sWRTpqamautnhIKxQU4qplc\/Gz636Qdo\/Gs6OtNyNb2d6tmydevW1PD27LPP9uP1lDa89XJaPR4d+rfddpv6xjz3uc\/VUMxrX\/vaQa0n\/BPyzW9+08w0kqMdNq644orXve518e7idVN8H82+vqmzio8+pc9YfC6pp8cJPKPanjkenqrl\/8P7Dg7vKZgGW9LXdhys88LWmDek0ka\/TLxxv7X4ZeDlmLW9U5yGIzQKkeK133h17WsKr55MpCrDeBz2+\/1qB8TqjHQcM\/GXJdZfxidYnT5NeVXM0vwytcfPaH46RgFjLwBQjmUYexm+oX5MBzzlSefFKiVUP0X9W91ALq7cO0UbyHlqWU1P+v2+usp89atfVZnjy1\/+cjP79Kc\/7R1mJiYmUnKqNGr\/\/v1m9q1vfUtXVJ5+5ZVXmtn5558fm3t4WxIlL3p92u12PDtZxVGaIfO66fwsHQbp8qkz3\/E6cuSIrpvmSNO9xPcibUDor2fMrL3kVFNwfpV4O\/4K1E7PxsMm3Xg6CRjeESgdfunXOFvrH4Q4cdpqteKhqz8tLCzE2gHvIZom56tFh9UaTT1rjfPMzs6mIZ344vtrGHus+rlF\/E+\/33TuFQNFOkEkTx+EPB0AynFq50jTMgHx71uNCT744INaYa9HovaHmzdvjmNq09PTqkLTN\/bKfDkP2VPp17\/+tXZB2rFjhzcneP\/73\/+EJzyhejtxvuj3v\/+9WsRo96UtW7Z4r5g4IJumDUak3tFbb3vq5yl5Guvs9Xrx\/KO27fhxTVSm+c+Y\/PratLgoprbPn59MePf8alP+am1f7CmYhvL9\/Yqr3v11GFLL6E9K\/xn7VaSnXN0LSYWY+jhIv9+vHYaOa45St0gvkUw3rnMUX0IVXw1\/zfWQlEH7i6ynoOKFdrtdWygZjxB\/QfzqsWzRn0jtZzCdEyBZhpieZj5r58rimrFms6nmWarm3r1794c+9CFffqkr+tXTGdbwcZ5l4V85erSKXKmq12ftf\/rTn6r1rv76\/e9\/38w0feozTulx6pvsl7\/8pZm95jWv0X9+97vfNTMNy5x++um1A1ajs\/S0Gm5S79n0lGu3lzuuc+d0xRhSveSjdp5ZB4xnBumRVx+Pfxmk4cH4BH1WX\/fowTEtYI7bcaxfvz5+tdfWbCwsLOjNTXOt6asi7bxRXWDR7\/d1+yqiV\/SvVuzEqpgkvT7pijFitFot7\/Ey6DKp95aXwMe6oCErTv3l6nQ6VKYvBWMvAFCOUzX2Unsmu3fvXu0qp4nQV77ylVoj+sQnPtEvk+rKPVNYgVOt1FEvpgzV7Xfj66bU+8Ybb7z66qs182lm1113jeZRJU2L6b6OHDnyuc99zsw+\/\/nPm9nzn\/98M\/v617+uikkvlByRk81jbhxcTbhSpWa1Ic8JPIC0pVnaObq2BtF585PaadX4FGpvxy+fNoyOY0FpgaU3S6mdj43DR2mcxCv2dJbj3RDjFG46dUtlxLqiFxeks9s4UKPbmZmZScMj1c1D+v2+En\/9ad26dfF41vDR4uKifo2tlqoHTJoOjXWcGodptVrpUInPl4Udg5CnA0A5TipPjwsWYqFSXE+kr9bvfOc7ZqZlO+eee64mBjXu7OPXKR2I+aAv2YgLTE7REjJPJ2snZGrXf\/ol\/\/3vf\/va13vvvVebdWjDDXV9SSmhLz39xz\/+YWbvfe97zeyBBx5417vepZWouqL3mF7dhtFD1uZ0u904+r+UvbOPazw9VXzGroQ6DGZmZjQCXruddKpBjFnk8NLY6vJU\/b8urJT5wIED8V78QxHf6zTQXDvo72tNY7qdFpem3Nn\/qh\/8c1Td9MM\/ZX7OFFu7+FGdpiirG6mndzZ9WHyaIa3\/jCvC\/GXRcL\/3e0kvVJxgSPeF4cjTAaAcyzCeHtM33zpW39j33HOPav527txpZt\/+9rfN7OKLL1bNU1q2kMoh0lKLFdjjzUczq02cfTgyJVxD0sz7779\/69atZvbXv\/7VzDTUvnnz5sc\/\/vHDG2fff\/\/9urDaxXz5y19WgwQVsa06rzDzdzyuzUnLyvT2pYz4JHlJSeS1cfp3YWGhep7nBZfpZEuFpDoa4w3Gywzvnx6fbGosXtsrMa1K81cy7vKTluH4n3wBTsyy9YPn4Hqa6VHFgsvTTjtNWwil09B4X95PKdZfegMDL5uJ50Oe0XvZa21ZTm3bAN2gVpOldjG1xW90ehlkGWJ6Wj63Z88e36Jzx44dH\/7wh83sPe95j5k99alP1VVqS8pSw4c0DXUCRc3L8rx8Fiv1mqg2najGGt3C9773PTN797vfbWYvfelLNcDy+te\/Pi1VjfFRn8abb75ZA1YveMELfO\/TN77xjSvw3GulthspiOuvijje\/inF0JN8+2p7rqW4lsqf0xBZ\/O5MV\/EAlDbcqI4\/+ANIO9mnNaIxR0kzqF45HiP+8E+iB984y+ovb5o0Tl1lYuNcv6JehNhIy+vc\/cnG2\/HXWW+xb8I3JK3x+6r98MYXLc17u\/gVWPuhQxVjLwBQjoF5erVUKOWhaW5Tmw9s27ZNG8upnu\/6669\/8YtfvCJPZHTplfzPf\/6jgRRtiadtrLds2aLXJ52UxFOWP\/3pT8r0NYqlZUrbtm175jOfGbOn2Pu3dsYpleUNv0w6Kmrzo9pTYD9P1\/yhZsA85x2RyV5\/qNWxoNSc2RfxxkGJtBfzyeSM8Yqe\/qcFXMtr+OLkuDaw9kmlk5tTugodJ4Y8HQDKUZ+np5Q8LYj39Fxrbe6++24zu+SSS3QZrY+\/6KKLtAZhLZcfxZfL15r\/+c9\/Vkd4M7vvvvv0g+Yb1CO+mhHrdn73u9+ZmeYn5ubmtIGfBtnPPPPM2pX6aeMO3azWjHh3kSGtLn2mJOZ0qYePL3aPZWdpKFZarVbcoWIU1K5b8QU41TzU35eT7FGh98X3vPYbT1WDJ\/fkjkPahzqdf8R5Aj8tI08fWQPHXoZMLutPf\/jDHy6\/\/HIze\/jhh7VsUi1kdaD756S63cxak6aGYu+ku+66S817Fa+vu+46Valr9t\/rcKplAz\/4wQ\/0JaoAdPvtt7\/5zW9Oba1Sdc2gJZHp0ep7Wg\/Ap\/Li1h++QjJ2nvJ9IXzVoi9QiEXiqbR51dcBeiMRHyzyJ6tf5+fnY7mIDubp6em0D0zqdnK8\/KsiTj6nkqFlV20fVO3WUh0r8wlP3\/WCucpRw9gLAJRjYJ5ezeP8pFsNFK+66qqNGzf6LhZaJ3n48GEtD1vJosORVX0RqjWaKhP+2te+5i\/sc57znO3bt5vZy172suqt+fTp\/\/73P9\/sdPv27c973vPM7KGHHvKCa2+K61ev7qrhe4\/56VS1T0vaiyCleGnfgyHv+KCt41ZLmhD28kS9At7bufbRDtmrYSlqVyOnOdtTNLhRO9Ht27Smk4O41YZMTk6mLrsYNWs65gJAYerz9OHl\/bt27dKXuTaWGzIwWm1nuKakFUnVNiDp1dP06Q033HDrrbd6veM111zzlKc8JS2x8bRRg9r\/+te\/brnlFjPT7iLnnXee\/poGx5eeSlf\/33+uvUC156Ly3LhO0o1Inp4WxHq\/mjiE7R+E2ukHfyLHu2nJKubp4j0p4zRv2m8vdUVP75qy9UajsZY\/4KOJPB0AylGfpx89ejRuKeLZhH85V7crq154if35CuYla7HAQL\/qXy8HSg351B5HbSzn5uauvfZa7+\/oLaqH5Ee19YVJqlP0xn4pc6ytbaiWTKSimrQqJ9VIKJevbmq48mJ+rQz04MGDmhBycR1Q2kN5uYp2Vr7uJdWV+vRA7Sc6ZegnuUU4TrWBc6S18SjVp8cDvXZnNdpjOv9wxhWJiVcHxlB45513Xnrppf7Jv\/fee83sFa94hW7Hawd9mmtQY9jUckQf6bitZVRtcjK8127qu+T1lzEkea8SPbDUo23l+cE5ZJSj2+3GHRj8Maej\/XhD\/CrWp3u7mOo3q78gtdW3cacOt8YHV0cTYy8AUI76PD3l12ldmS9TTHmc0AnTHbOB3KAyuLhfwcTEhMoW1ShGe92df\/75av9y4YUX1l6ldglJ2gQ5ppZ+ZhDnYNOYgKfeqUvJEp+7H1SrnqGL58WpgWIad9KLVvs0U6PKExhmXPl+L0nt5oIyqPiVj\/aII08HgHKcqj2mcYrs3r3bzLZu3bpjxw4z+9GPfmRmmzZt0l9jnl5dHlJt7eLzqBpeP3ToUKqVjFdceq0egNVCng4A5SBPH1e\/+MUvzOxxj3ucmT372c+OnQJTDy8vTPIimZitx1KH2oOBIVRgjBDTx0xauyg+KqIRFa9TjPs5pO33xIsgFe4XFxdjDWsatGHsBRh9jL0AQDnI08fSoP2stQbSl4bW7tOdbifW83lPmIixF2CMkKcDQDkYIR0zaVW6L3vREp44yN5\/lP\/qSXpc+e3\/GZuhs3AMGF+MvYy3NHupgRT9uri4GCdFff5T0d+3JUv7rg3qvXwye7MBWDGMvQBAORh7GTOemKfNu2NrQJ8jVQ6uP6XCRG+uqWGWDRs2qNNstcVgarwMYJSRpwNAORhPH2\/eDtsXFvnMZ6fTiVOdvkW4pLlWb+UYF5R6G85V32cOwBLxWQWAcpCnj5nUszvukux\/1SC776Hs9SpDdkFSwr6wsECJCzDWmCMdMxpISXvee38uDZL4znOaR\/UZTv1\/3MGu0WhoQEbLUOPGF3GjjLh3JYBRxtgLAJSDsZcxM2ij55hZ+3bAvviourW\/pKVGaR7VMSADjAvydAAoB+PpYyaVFXq5YXVP8H6\/r1FyDcF3Oh1dOM6RdjqduCfGzMyMXzfeWrxxAKOMsZdxFVtx1W4273\/yMB1nUFP1i4+uMMwCjDXGXgCgHOTpY8b3lvOKcqXkXuPoWXan09Gv+pPXO0Zp7CWl7d77hbQdGBfk6QBQDvL0MeOZeCpqjP0U01C7\/0lLkOJOF2ny02sZU3dGtsgAxgV5OgCUgzx9LKXBcc+vY0JdfWd9nL26ain1jfF70a0xng6MC2I6AJSDsRcAKAcxHQDKQUwHgHIQ0wGgHMR0ACgHMR0AykFMB4ByENMBoBzEdAAoBzEdAMpBTAeAchDTAaAcxHQAKAcxHQDKQUwHgHIQ0wGgHMR0ACgHMR0AykFMB4ByENMBoBzEdAAoBzEdAMpBTAeAchDTAaAcxHQAKAcxHQDKQUwHgHIQ0wGgHMR0ACgHMR0AykFMB4ByENMBoBzEdAAoBzEdAMpBTAeAchDTAaAcxHQAKAcxHQDKQUwHgHIQ0wGgHMR0ACgHMR0AykFMB4ByENMBoBzEdAAoBzEdAMpBTAeAchDTAaAcxHQAKAcxHQDKQUwHgHIQ0wGgHMR0ACgHMR0AykHMB4By\/F8AAAD\/\/zzomE5aVwfLAAAAAElFTkSuQmCC\" style=\"width: 250px;\"\/><br>",
    "option2": "\\(\\mathrm{HCHO}, \\quad\\left(\\mathrm{CH}_3\\right)_3 \\mathrm{CMgBr}\\)",
    "option3": "<img src=\"data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfYAAADPCAIAAACIi2Q6AAAevklEQVR4nOydW4xkZdX+V1V1dTMzOCOJEtTEQ4yg8UbJqASEjInEGIhivBnjWTwFQdGo6GhmBAXxwAyQgYmHKEhiNIYLg3cmJiZeCOqFMX8JHlBGmAZFEcY+VNfpn68fv+dbrPet6uqe7uqqdz+\/i0lV9d679t5Vs+p511rv8870+30TQghRIvXtPgEhhBBbhUK8EEIUi0K8EEIUi0K8EEIUi0K8EEIUi0K8EEIUi0K8EEIUi0K8EEIUi0K8EEIUi0K8EEIUi0K8EEIUi0K8EEIUi0K8EEIUi0K8EEIUi0K8EEIUi0K8EEIUi0K8EEIUi0K8EEIUi0K8iHRXGb5NfxU8XlklvJg+FUKMH4V4IYQoFoV4EWms4l\/p\/S\/9pwO9P7uKmXVWwS5\/+9vfzlvl\/62yTZciRNVRiBdCiGKZ2e4TEBMNkun1epQCtVoNWXu+0mq15ubmzGx+ft7M9u3b95e\/\/MXMfvGLX5jZy1\/+8rGfuxBCIV4MAMEdoXwQyOf0ej0zm5ube+ihh8zs\/PPPN7O\/\/\/3vN9xwg5l96EMfGuNZCyGehhI1QghRLFLxIk9WvyMzU6vVkLpBcXVm5n++RQ899NDrX\/96M3v00UfN7MYbb\/zkJz8ZthFCjBmpeCGEKJaaJqeINeGXJEh7iPp\/\/vMfZvbKV77yxIkTZnbLLbeY2ZVXXpkWaYUQY0bDZxFB+dQH6H6\/H+I10i+PP\/64mb361a82sxMnThw7dszM3vnOd\/rdMfEVjfNCiDEjnSWEEMUiFS\/WTavVeuqpp8zsVa96lZk9\/PDDZnbzzTejPxLJnF6vByEv\/S7ENiIVL4QQxVKaik\/zyCO+GCqKo0z8mTq63W4wn0lh2t03O9brdX9D5ufn9+3bR\/1+2223YYoT\/tput9UlKcSEIBUvhBDFUo7U8qqcj\/GAT6FMIUibzSZ2xIvYMcjVwkj9I\/HAXyxN3iHD0Q9DSf7Xv\/7VzC655BJ4FRw9etTM3ve+9\/mD48aurKwgC1\/w\/RRi8qlQX3xIUyCy12o1\/2K\/369CMBoedtHt7m9Lr9d77LHHzOzCCy80sz\/\/+c+HDx82syuuuALuNDgmdlSKRojJQYkaIYQoltJUvFegzBUEFhcXzWznzp14GiRttjZbDKOnTfydnJ+fv+CCC8wM\/sCHDx\/++Mc\/zi3D5CZlZoSYHMoMZEIIIYpS8Swephq81WohZZwKzDT5jm0qlVamf6S\/dahVwH9m79696I+89dZbzewjH\/kItsG9gtLvdDr+di0vL5922mnbdEFCiP9STojPggj1gx\/8AG63n\/3sZ81s9+7dDEzdbhe\/DWywqQ6DzMXAAw88YGbwB37kkUeOHDliZh\/72Mf8vrh1fmEQHo3HVN5GiG1EiRohhCiWclQ8EgtQlMjMfP\/73\/\/oRz9qZgsLC9jmxS9+sZkdPHjQzN785jeb2Z49e8KaFdh4165d23o1WwJ9Y7JPQafTOX78uJldeumlZnb\/\/fcjP\/OBD3zAzJB7CXXsUL4O1VctCSLENiIVL4QQxVKOigc\/\/\/nPzey9732vmR0\/fvyss84ys+9973vQle94xzuQlDezs88+28w+\/elP40XKTBYPy9Oew1U8hj5PPfXU3r17cffQH2lmV199Nf0jfUnWN1aGo3U6HU4YHu9VCiH+D\/33E0KIYtk2FU8BOKSRMSwGDQtDtr4g54unf\/zjH6+99lrk36m+b7311ve85z3MINdqtaWlJTP74Q9\/aGaHDh3CWkXnnnuumX3pS18ys4svvhgHD443eDDKJCl\/P2u12pBWzk2\/k0O24ZmH0Ym\/IvjP7Nu3D6Mc+kfi4N4\/Uu0xQkwL25yoYTT34ZsvZmMorcROnjzJTu1rr70W0edtb3ubmX396183szPPPNNHtKWlJbip4IDLy8tmdvvttx84cIAncO65595www1sFmRTIDvreRrtdtv3WYau8OyZh122iEHmYniAUwrmYojpl1xyCeqrMBe7\/PLL+etIWEpVK6QQU4ESNUIIUSzbpuKDDAwq3s+pabfbeICNob7vvvvuz3\/+81Sg55133ne+8x0ze+lLX5qqy5CdwBGoT0+cOGFm3\/72tzEawFujYHvNNdeY2TnnnOOPhsRIr9fD2YajhffFmay5EMemsKayDl6bqX8k6qvBPxI7FlZ5FqIiSMULIUSxbJuKZ7Y6W27978k9faFnNER+5jOfMbNf\/vKXmMf0ta99zcze8pa3+INnZ9\/0+31fLQzvi6f\/+te\/PvWpT5nZHXfcwRf379\/\/5S9\/2cxe8IIX+F3C4ABvCpmcle0hX7+5jOh0P9w\/0sxoISn\/SCEKYJsTNf1+HykaX8lcXFzkVEkz+8Mf\/oDuF1jNgNtvv\/19739\/6i3jw26n08EPCeIU0xSoneJno9lsZkujcGj54he\/iA4cHBZPMc\/zzDPP9DXh2irhGjudjk8xjZnNMhcbkuMSQkw4StQIIUSxbHPT5KAVPp988kkz++pXv2pm6GJkjzZyJmeccUZIjPgOdAhYCnzWckNnPRQ9JCqOEyxwoWHvv\/9+KPd7772XWx48eBA5jR07dnid661ytmWZkVPxj0xr3fKPFGKqkYoXQohi2f5yq1e4SPXeeeedkOpoiHzta18Lk5kXvehFVOijdCL2ej2fSqaI9oVE1nKZUofSz64I+LOf\/czMYDp\/3333Pec5z0FVwMze8IY3QM6DMFzAOdfr9a2QvWGIMGS+2PHjx4f7R\/oLl3+kEAUgFS+EEMWy\/U6TOIH77ruPTR2\/+c1vINhvvvlmM3vTm96ELYOLQLrwEGEG2YvZbreLp0OkdLDHCR6K\/l7dfffdaN\/EjKHnPve5qBm8+93v5jZb2iVJhqt4+keihWYD\/pFpQ059la2+LiHEqbOOEO8rbGGeZHDCytp1sV7no8aDDz74iU98wsx+\/OMfc5sbb7zhqquu8vZhW3Dh6yC0nDMJg7iJMz9w4AAaEF\/xilewDfHCCy\/0CY3gvQMG+dgM8ThjRdT\/foSfE74XzcWQ+JK5mBCVQlpMCCGKZSQVn\/YahiolzX6xDZIDYZENKn389XOf+5yZ3XTTTfgr5jF94QtfMLOzzjprFIPcsdHr9XwXZuhKxM2p1WqYZwtPY1zj3r1777rrLjrntFotP8MLcPIXK5nZu+3vc5D2\/NNw\/0gzO3r06HD\/yNFnyQohpgKpeCGEKJZ15OJD25wnK7qzevDYsWOQ6phDf9FFFyFt\/bKXvSzN5mdLqeNkyLolwUWSF\/uPf\/yD62lA0ZvZ29\/+djO77rrrnv\/85\/tdoL5T2R7uAF0teVY4QtYVB7s89thjwT\/SzK644gr5RwpRKUYK8b5myLaWtDOa2Rtugwe\/+93vmIr57W9\/+5KXvISTVN\/61rf6AIfw1G6304TGthB+urI\/cr6Y7MvRZvbwww9jvZEf\/ehHuK53vetdZvaNb3zDh+bQmJ86soU5pf1+P21oYdyfn583swsuuEDmYkIIJWqEEKJY1pGoCfmErAD0Lz7yyCMQj9CwePGmm27yK06QoJcnrdyaquZBZcnsbfn973+P5Qa\/+93v8kUI\/GuuuWb37t1+Y9xnX1nlnFuQXR2w0+nQPxIDiOAfiXOTf6QQlUIqXgghimWDs1sXFhZ27doVpP3y8jJU53XXXWdm119\/PTTjhz\/8YVq7PO95z4NmRDqYrX44AsQvK5lg27V8ttmRnZQgTanjhnjjmn6\/\/6tf\/YrOjr\/+9a9xsbfccgvvUq1Wy4r0MBMKtx13Bi8+8MAD9I80syNHjgT\/SBxkuH+kmiaFKAypeCGEKJaRVHywZvQL8uFPELl33HHH1VdfbWYnT56E+SLMCaAus90gQTMuLS3RgX1y4En6LHk6thhSP6DTJJ7iaD\/96U\/N7KqrroKHO3wrDx8+DDNIJMqRHw8NmsGr4MEHHzSzSy+9lP6RWJpqA\/6RY\/PVEUKMh3UkanyugC16yDzs378fsQbTONEPftlll6ULmTLpEcqSoeKXbRUfP6M4fPFy0iVhB4VLf3VLS0v33HMP16Q9ceLEs5\/9bDP75je\/aWZvfOMb02U6ePMxf\/Wiiy6CUTDNxVIvIMAdB5mLjW3dEiHEeND\/ZyGEKJaMiudieyBIUQjA+fl5lAd\/8pOf8E9HjhzB\/CYIW2rwIcaKVSZ43SBnctddd8FACEaPBp6Gp\\/nlZJdls9lmswlfnGq1inWnq9Vqo9Fot9vtdrtWq9Xr9U6nU6\/Xa7Ua1reOy+T2er1Go4F1O7CMpuXW2Y+Li8eFpm1sbGBFTH8uNHzElsa3aTQavBAzq1ar+HWn06nVao1Go9Fo4LqwdC5WjPfL93LFeqwf6y8B\/7bbbbzLXV8stlqtYiXMarXa6\/WwPDaeTb1eDxVqrB5c+h8PuNPpYG1WHAQ3Fw9+a2urXq83Go1ms4k10Zu\/x\/L8eLfz+Xy9XufxY83EZrO5tbXFbZDR8Py63S6ek78VrVYL18W72el0FhYWdnZ2arVat9sNyxP2ej0sFo57vbm52e\/3sbh4tVrFcr64M0dGRkZGRrrd7vr6eq\/Xa7Va9Xq93W4vLy+XSqVer9dsNhuNxubmJv60srKytra2vLzcbDYbjUa73Z6dnY3jGIs4Y9VO9DLv7u6OjIzUajW8LVjNvN\/t9v8f2LX\/A\/D2lX1uX6dAAAAAAElFTkSuQmCC\" style=\"width: 250px;\"\/><br>",
    "option4": "<img src=\"data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAf8AAAC6CAIAAAAvcdOCAAAeIUlEQVR4nOydSawcV\/X\/T4\/vvQQ7YYgEQVkQRgkWSEECyRsWEBRlgxAKCgogVhFhsMJsIIQhQAiTMLDAgCVACJAlkFkAQkKMYpAFCyzZbMzGC2Qx26T79Vh\/4e9fX53fubfrtZ\/72a\/6fj+Lp9fdVbeqbt06de6ZbreqKhNCCFEY7et9AkIIIa4Dkv5CCFEikv5CCFEikv5CCFEikv5CCFEikv5CCFEikv5CCFEikv5CCFEikv5CCFEikv5CCFEikv5CCFEikv5CCFEikv5CCFEikv5CCFEiayj9q8vg\/\/l8jn9ml+Gvfhszm14mtDO\/DD+OLsND+C2zuwshxH5mDaW\/EEKIHWmt0+ouuJZWqwV93My63W7YBjOATqfjt4dSv7Gx4acOaAdMp9Ner+fbGQ6HZra1tXWtLk4IIVaJdH8hhCiRtdL9Qaq5w2qPqQC0fk+v18PGk8kE37Tbbc4SQmuYUnQ6Hd\/+eDw2s36\/v\/cXJ4QQq0G6vxBClEg0izearNYPYNMn0O6x\/XA43NzcTHf37QwGA5j4EQXU7XYxCcBHaf1CiMaxVpYfyGJIdu\/I9U5aL9N57cFF7D3D+NtqtQaDAQX9bDbzFqTt7W0zwytECCEagSw\/QghRImul+6dRnuPx2JtlRqPRgQMHvM0Hej0UeUwdmOGFdhDoOZ1OsQsOwV2EEKKhSPcXQogSWSvdH2TzvKDRb21tIToTwZ206XuHwXw+xz\/YEv\/3ej2Y9TFdIPAQwJeALYUQohGslfT3ZXkYs+9Fc+sy3DK8Jxi2z6B+SvZOp4Nd0F18Q\/jjSvoLIRqEBJYQQpTIWsX7p9o3fbNU52GrCb9Co8ckoKqqtDpQu92Ggu+DQWlBCiWAhBBi\/yPdXwghSmStdP+sD9ar53QMeMs+df8wdcCODPT0yV8EzYYJgRBC7H+k+wshRImsVcyPJ8TzQJHf3Nxk0I7X2X0mV6\/XC1UiMC3ANvg7mUyg9adbCiFEI1gry48v08aYfeT6BstPAN8zrdfbcCDfO50O3g14YfR6PfzDBWEWVZcTQoj9iSw\/QghRImtl+QkGHHyJHC58bLVa0NbxJbZnwU4Gg\/qyP8EzzP+h6cvfK4RoKNL9hRCiRNbK7g99HGp+yMOiUR5aP7zBQXPHx0VLtfiyP3QmY1\/lfAkhGsdaWX7SPN7t7W1UZ8NP7XYbr4Gwxkt2eRa\/5Xw+D4v3SuILIRqNLD9CCFEia6X7e0IsP2i1Wj7Ll6vyegcvJxB+R0aO8st0F\/l+hRANQrq\/EEKUyNrq\/svAvF+vts8vk64PI4QQ64R0fyGEKJFC1Vss0Li1tYWPg8HAzG644Qbo\/tL6hRBrT9GWnxC1yVcCvLh+yRchhFgzZPkRQogSKVT3D1U5fTnosGK7EEKsJRJzQghRIoUataH1+wVbSLvdhj8AqJaDEGItKdTyU5+d698NQgixlsjyI4QQJVKo5QdaP7y7k8kEyj58v4sqPAshxDoh3V8IIUqkULs\/rhq6f+iBqqqy3wshxDoh3V8IIUqkULu\/X9tr+Z+EEGJtkO4vhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAlIukvhBAl0r3eJ7Abqqoys1arxX\/8r9Pp9H8X1v3fpc1ms06nw5+2t7c3NzfZAlvDx3b7\/78L8Y\/fJhxiPp9zY3zEXrPZzMx4RHzv2yyZcC8mk4mZ9Xo9\/pPuMh6Pzazf74fv\/a1h47jjvBf8x++F+7joftUcNIy08DF7Cb5xDpjsEf2X4dJarZYfz4vOB+C68GX4KRyF\/4ch6jsN27RaLXzMngYvPHvocJL1p4dDoP2aB5yjiGde07HZXgr3Nzzm4TJ9CzxETec36zFvpQ\/SPmQ6nfpRy3sTbrl\/CMMAwr3pdDq\/+tWvzOzZz362mT3taU\/ztx\/\/jMdjvCH8YJ1MJnyd+BPwY2UymfjnP7whwHg8TmVZaQQR45\/Y4XCI\/gmP8XA45BPb6XSyj\/r29raZbWxs4KN\/YkHYcT6f4\/ahWW6JX9EaRgLHBocKTn40Gvkj4lcMQt7leiGF69ra2vJjKTTrG+dJYshxy1T0zOdzL2fTwYk2\/SuHDwvOBNtPJhN8ySvKvqsWSfNFT8d0OsXZek2r1Wr5h45v9HDc8K71H\/nG8mfFj\/6ezmYzHNS\/b+bzOa4r+6oL94KHWKSj7H+a9KYSQgixKpph+eFLGP\/gzTydTr2S3m63vXJBbQKqwT\/+8Q8z+8AHPnD8+HEze8Mb3uC3hHaAXahzHTp0yMy++c1vmtkzn\/lMfwLU64MK5s+ZypdXZ5qoIKwQr6YF5Rp9eMstt1y6dInb885COwbUWPkRW7IpkM4PRqORv0dVVfnbQU0Qqhxao8bqb2Wn0\/GTBjMbDAZmdsMNN1CZnc\/n+BVbVlXFfRddF3VknCTO5\/HHH3\/CE57AEwizXl6O1\/o5P\/BqNS1s+JLd4o0YYZoCer0ebg3Jasf4SHXe\/xpU4\/AxDAl\/E7vdrteyec7BwuY\/cht0Ai8ER0HjNZYfwrkdejiMVT\/RmU6naKqJMwDp\/kIIUSLNsPsH9TwYGYOWh4\/c8tFHH4XWj1\/vu+8+Mzt69KiZPfGJT8SX\/r196dKlT33qU2b20Y9+lIe49957H374YTN77nOf61VCr+NQvwNZB9QiC2lR+N6GUkbFeTgcemMrFUNvic4SlOvRaIT2fW\/Tq8mPGCre+J7enTB7yHqJU+2Ps0OasL1CHfREP3dkaxxaGDle\/eTFoq94zpx24Cf0Hj1VaRRDv9\/HmRD0sP8yGN+Jv32cRWFH+g9CbEXwnXpfBbakQ9Xvld5onlh6g9gVYW7k3T9h45oj8pwBTpiTszAhkO4vhBCiGTRD9w\/6EdQimlbBbDbDyxn6y3e\/+10ze\/DBB\/\/2t7+Z2R133GFmn\/\/851\/84heHsBPGmeFl3uv1oE38+c9\/NrPPfe5zZnbs2DFs\/Ja3vAUziVtuuYWHXhTshXNG44yRKFb3p\/7re6CqKuq8IUbWdynjNPx0wcM2ocLDEB9ot9tpIFAaCol\/gmLunTftdrsmSjUbmtLtdjFofZsbGxt+m0Vtpt9zxIbYSoCepBsMF1JVFRwq3qlQVRXaofvKm+\/908SPGxsbuED6M3wwFYe6j1AK4TTZbueF+MlHGgC6KJQufQYZ1IQvvb8Hjc9mM97NdBRBFPT7fX9d2Ugz+GbM7MYbb0zPap\/TDOkf4gJJMASdO3fOzF772tea2alTp8zs6U9\/+sc\/\/nF+SX+dH1VVVYVQOW9nwC0\/d+7ce97zHjM7efIkRgw+HjlyxMzol8PAwqkucqw1KyJ4taTPT6fTgeGFnZYGFLbbbR9MOZlMYCYK+JcKHZVePwhmAd6IMIpwPjyEjxgO6gIIUbzZYMHZbAYBFGxHwVmamrA48inT0bgPgKYgoyz2Z043L80y3h7lw6MZpxDeN15EsNPQWnhXUUr691mQMCFEwotXWqKoNoV0jTQqNFwm3zoh+cOPDWgG9LfjWDSF4R9v2wkdwruf7aVm6XblSiIhhCiZZuj+VJkxez1w4IDXKf7+97\/DyPOtb32Lu7z\/\/e83s4cffhhvY04wazJ4w8s8zCWhEv7xj380s3e+852\/\/\/3vzezJT36ymcGxfO+993qdNKS3NFE1WC1UY30+FFU5EDyo6M+qqrwNLc3fhmnIa9A0s3jN\/cYbb0Q7nEl41z22oRYfVMtw+2oyQrkBQy19gz5ccpHN0B8xO1MM05TNzU006K0o7KVsqm1oCn+Hw6G3kPAk\/TwmdEtQ5DkFSTXoMOsdDofQvv0sodVqZS0\/i0wuO8L7EoyN+CebHBpuYnrQ1HjbRH8vkO4vhBAl0gzdP+v7unjx4te+9jVo4lAuXve615nZxz72MTO77bbbsNmORTnSoj0+nA6ERKHZbPajH\/3IzN761rea2fnz5+FjQKjoPffckx6lPne8EPxNhFbF0g4EHeWLH9BdzD4M9Rv87rjR4\/EYR\/G3gCVr6N7PatneEh2mJjxDr5OGgMtAKKLgddusyh+K24TRmHXzchKTravDa089w\/1+35vLq6pKvWKh9A0jNXEr2Q\/48uDBg3gw0zQ61krJTj6w++bmJl2y3t8TqjNlqwn5Sd58Pg8Pmr9MzpOyEy+fVTeZTLx7g5NLf98ZRtwUQepZvfSvEXOh9khgmcpZ4Cc\/+YmZvfGNb\/zrX\/9qZi960YvM7LHHHnvpS1+62mtZNDfnC+Of\/\/ynmf3sZz8zs8OHD8MGhZyAT3\/60y9\/+ctDC2HamA0BChmPPFaY3e+iqlT22fbdnk1aXiE+RTYNCff4nFgOG5K+0SeTCXYJb\/TgscSX3jmfGhbQCRBk4\/E4BID7MAHu6Ds2lJkLntisCSJ0kbcRpULcBx2FEBcfq7PIpx1+9XEvIRQqWwsv+\/ohtPz4OK6QSEwDlBcF2SJ62XD7TqfjGwyOa7YWTi9kJ6QjJPtGCdfF\/4MxMFxgg5DlRwghSmRvLT\/z+dxPq7Mq\/+wyfD+HqQMnWadPnzazd7zjHWb205\/+FL9+\/\/vfN7M777wTtoJr5lMNHl3oON1u9yMf+QhNT9Pp9K677jKzz3zmM2b2nOc8B5pL0K93VLez84OqqkItyeUJR0x9VntXiNTfaNzi4XAYtNF0qFD3z7peg3M15IL6iU6n0\/HqHu0DaIeH8G5nX\/k1zeMN8YWhJ0PIOb70VYO2t7drKkr6DGTqrYzWz86cQqSy78n5fO5VeCr7aJ8pFP7avT82TCx21P3RAqIz0MJ4PPY3sdvtpqm2zFFgqKUfBizF+t\/\/\/tf3jB9U7HP8w7lmSPn2scVhauUHFR+EUGTJG+5qZgn7H+n+QghRInul+2ejoOgd8gpReKPyDQ8lBZb0Rx99FJV5ABJujxw58pSnPCWtub8XpB6LVF\/jOSO7+Ctf+QqiTsGrXvUqM\/vkJz\/5rGc9a5G6x3vhlbjRaJS6y64+ZSxbbmXXoXXLEDQpQDVtkdM1tagGvwiYTCZBQUsJVt1sSC5t+jS++9TiUOOTx0rN7sHxWFUVrisc0Sv47PwwOfPH4jUiZalmPZlFX4b5kx\/VnB\/4HggltoI7IdvD\/Mlb29PQXnhWkCiLbW666SYIAU6q\/JlkjfKj0Qid4LtiMpmESR4ScdGTmDqEIYQ+39raSt08i6693r\/SCKT7CyFEieyV7l+vcYQtfYAHbWpQ9vH3\/Pnzd999N6vuYGWucJSQf79HV5TWBvEBar6wSa\/X+8tf\/mJmcAYgE206ncJ1gWnBwYMHvdJNTacmJsqXAaiPjFpEdoG9mqtbFdS10wAMnhWrpfuQSnqGsHHWJxGWTmQFG684hwiZ8XjsB0yoYRBW7Fp0RWgNG2dXmsNfpgGihxn3GepE7phMlNV\/w2QoG4mU9TCNRqNwaD8M6CxJJx876v7pLq1WyzfOsih+6C5q3Ps8aJqvSVtjmGwIbfLZZwwS83Oy1BHiz4S5gSHmp4laP1i99A994e9xmP1xduYnVj\/\/+c9h1fnd735nZs94xjNQZO1lL3uZlxG+BpN3+6yccDkU0zve7MFggEcL14Wacffff\/8vf\/lLNvjud78b7wZ\/8mFZmEUFjkIQ9PLXArD7YDCAYKpJgFg5wfKTfXj84zoYDGpC6dM2U\/DA33zzzZCAPlY9tBZMIqyTDFiWp6Z\/FplfsC+zl3FWflFJvvv9EcN7nZGUuJDsGimLFisOflEfPcnci9TGyMGwzEsxWH4Yxe9XiISx60lPehL+AbD\/HDhwABsjpT9UymMkrrcOpRH6+DKbhOzPKvuK7VzGByXjJH23UMkLesaeWk33CFl+hBCiRFav+4cajfUpOfj\/7NmzZvbe977XzH7wgx9g4y9\/+ctI6fKxeoA7XoME2uAMDOfgZ+XtdjtMdFKttqqqX\/\/612b20EMPmdkvfvELVApCkOjrX\/\/6tCBtyE6ilWxV6vmOVWVWTsgvzZbP9POeXq\/nU0Dn83kabtvv9\/0l0IHpddu0jAxaCOMHEwVEK06nU1+VMySIZX2nWcJiLzRSpT7GtCgNPnoteHNz0xcsyk4B2TjNZX6GEY7FQ3jVlYGVod6qP9tANtkqdA4csP\/+97\/Tx5ZZ3FTP0weclaIZkOonwWG1esqiYHDznmFfeyoUZVpk+Qmzh13kXe4TmnfGQgghrp69zfZKy+P4Ny3+Hjly5NixY9S53vSmN6FMAiyk2bUyaHcLC2dfkfPzimAJdbDke94bH3n+fkLwve9978Mf\/rCZ\/elPfzKzpz71qWb21a9+FS7ubCX0ZRzpi\/C1IkK+e1Ab99R86Q21TAIK\/k9vMp7NZjC\/BjN3cAKn2UPZ46bbhBkbvmRelV\/mMLvuOcnWVKACnprUGdGYdbqkDuHUFRSSktJ4Tb9OgG+B54alKYIlvaZo5ZJe33Rwcp7BDklXW+z3+34xg3BdLDSEYcxg2WypzqwXB\/Ap8BMLLhyEDqd\/xYda0BkALwUHZ1gGp0Hsrdc3xPO0222M6RMnTpgZFki5cOHCS17yEpp6XvCCF2QFULaw1zXwtIS5JL8M5gs\/5liWK30Ggg+t3+9fvHjRzH784x+bGd4EZ86cef7zn88Ap0OHDnlXYYjC3gVZc1mwNuyu5XrCOWflSFisNZR2yRqL2JpPyuXCIP6ObGxsMNJ\/keUwmGjC6fG4wX7ih0Go8xNMJWHYZEPpQ96A765gsaFk92EwPERISM4GdAVLlO+QbMHz8OIJhBdwiFbKVhMKneO1wzAs\/ZDgSU6n05CEnOZCs1l2hW95kc0nfY2FIRGe7iZG\/sjyI4QQJbKs7u+17JDNuMxLD1rA6dOn4cVF0R5kvT7yyCOvec1rwpa9Xq9Zb9FdA9UDHYsEzmPHjqFmNTr27rvvfuSRR8zshS98od8x2+1ZB1S2dFK2MHJofOWEoi7pl5zzpUse+jBQ2MSyOnJQUb3+2+12w8b43lvYWFWYR\/SKOdXGMCHA4ULQYVA\/s7Mrb9Pwdrk0vjCoqP6c2XJY3wZHyUaphp70J+Bzoa\/ySfS9xEyOkLntJx\/MCQC9Xg+eZ18Uloo8t0wtfmH1Ry4YGS4T+CiDdGBwVNRM9bKlVRtBk85VCCHEqrgyu79fWLE+3YZ+uX\/961+szfntb38bvz722GNm9sADD\/hafcHX1EQ72vIETSHkH6HTvvSlL5nZBz\/4QXyJSkFwBtx66601ca5cqtA7zbIr2k+nU1\/KMcSqrhZqUv7au91uqLuSZi9zQkDVO3W6pDoXmoVXky1n1wAA2XJDwcMU\/HtZk3FQCYn\/NTResyPV4XCqWS89S97jrMLp+YOGnmQpnmyx0l3kk\/sdAeMdAH0ePl4znYD6lS0wQqbTqT+9EFfCwrd+IsUk86w320++U29NjUafdfJL9xdCCLHf2b2WF9acoh7hFZCjR4++613v4i5333\/\/gw8+SIs\/Nbi08nhD36XLkzW+Z6NEzp49i4jYL37xi9zxgQcewFLyVHxCOhLIhveEWqrYxluQ9zQIONhYO52OL\/uTxkRlA8DSmpr2f1fQDFcdloRkBIi3QVN99pMJWpBZGiF7RWm\/hTUSer2e91Xw6vz50JQfvCN+ikM\/gbePh3CaUPYqe6xsT4aPrLi1vHuPpMdKK6oyLHDHKD7vCmLnhHP2X3a7XWzMWUsa1BuKwvK4PnArnSr5270GZokrk\/41Y4V3Fyuu3Hffffjy9ttvNzMswHvo0KEdYzSXL6SzBrB+WQg2D\/2MsYuM6Pe9731m9sMf\/hA\/4R3w9re\/PV3GNjxv2cLIpGYCvsKLzd5376cNozHYHGri0BdFxMKRziJr2XYgdrl2qz8oK8H5V8t0OmWstw\/tDYYXv0DxYDBIi\/CECle8ihDN6a2CvE2+8NmOPbNoPaJ0IRq6x7nl1RRPzEr24IHPqneh5J+3a\/EkEe+\/sbHhBxUlu38dhiSbGsI7m+Wj68s6Nau2j2c9NWshhBD1LKv7Zxcg9G\/UU6dOHT582Mx++9vfcoMTJ0688pWv9OVWUltEKLgRaGLlvHpqrog5zNmKxN5B94c\/\/AG5cqgYevPNN2NOAO86Z6bZY4Ws6ZCOd5WpZLvoDZ\/gs7m5GZZcB15XZfJtqBQdAgrT6Tkznvg3nRlQtQzKdU2YbJiihWBTOJ\/D5CMktfHQaNNX05xOp94uFOo88\/y9dYhGqkXFPhf1ZDiTsHToFT2J2dxMpMiizk+Y59UvU+pnhwxJQDtoM1iHwkQnEJbMDHWna6aMyxT0blbGr3R\/IYQokd14fWma\/89\/\/gOjs5l94xvfwCv6Qx\/6kJm9+c1vNjMUsFzUQlaPoA95nfT9RWR1QMJKL+mEqaoqKINwADz00ENnzpwxs9tuuw1Vkszsnnvu8fpIiHcMeMv1HvV8sCBztpFVmryKSo8FddvUyRmypcLcZdEcyB80aKaAC69n11Ck7o\/T83U3h8Mhtct0kUJcHWuOek05lJEI4MvBYODPM6vqclLFnvSFg7I9yeKpoeqqr3Kza2hS52D2t5hPvY+pTZdTBSFwGb9mjRMsxIurDusa7Tgz5qhAs4sW8kzX7GwKV2b58RPPT3ziE1iZBKPqFa94xRe+8AW\/8FbWsZ5GWLP3s16gHd1ZjWOZK8qWWPF3KqzHe+nSpd\/85jdmdtddd3HL22+\/HQuK3XHHHb023nu3223\/36AbxO6vr63hz8Nv80e1\/X8A\/qiuPwCNHvxNAAAAAElFTkSuQmCC\" style=\"width: 250px;\"\/><br>",
    "Answer": "1",
    "Explanation": "NO SOLUTION",
    "course": "AP",
    "subjectname": "CHEMISTRY",
    "chapter": "Alcohols Phenols and Ethers",
    "practice": "1. Preparation and Properties of Alcohols",
    "subtopic": null,
    "medium": "English",
    "difficulty": "Medium",
    "category": "1",
    "question_type": "MCQs"
  },
  {
    "questionid": 112257,
    "question": "Identify the reagents \\(A\\) and \\(B\\) in the following reaction.<br>\\(\\mathrm{CH}_3 \\mathrm{CH}_3 \\stackrel{(B)}{\\longleftrightarrow} \\mathrm{CH}_3 \\mathrm{COOH} \\stackrel{(A)}{\\longrightarrow} \\mathrm{CH}_3 \\mathrm{CH}_2 \\mathrm{OH}\\)",
    "option1": "\\(A=\\mathrm{HI} \/\\) red \\(\\mathrm{P}\\) and \\(B=\\mathrm{LiAlH}_4\\)",
    "option2": "\\(A=\\mathrm{Ni} \/ \\Delta\\) and \\(B=\\mathrm{LiAlH}_4\\)",
    "option3": "\\(A=\\mathrm{Pd} \/ \\mathrm{BaSO}_4\\) and \\(B=\\mathrm{Zn} \/ \\mathrm{HCl}\\)",
    "option4": "\\(A=\\mathrm{LiAlH}_4\\) and \\(B=\\mathrm{HI} \/\\) red \\(\\mathrm{P}\\)",
    "Answer": "4",
    "Explanation": "\\(\\mathrm{LiAlH}_4\\) is a strong reducing agent that reduces carboxylic acid to alcohol and \\(\\mathrm{HI} \/\\) Red \\(\\mathrm{P}\\) reduces the acid to corresponding alkane.<br>\\(\\underset{\\text { Acetic acid }}{\\mathrm{CH}_3 \\mathrm{COOH}} \\xrightarrow[(A)]{\\mathrm{LiAlH}_4} \\underset{\\text { Ethanol }}{\\mathrm{CH}_3 \\mathrm{CH}_2 \\mathrm{OH}}\\)<br>\\(\\underset{\\text { Acetic acid }}{\\mathrm{CH}_3 \\mathrm{COOH}} \\xrightarrow[(B)]{\\mathrm{HI} \/ \\mathrm{Red} \\mathrm{P}} \\underset{\\text { Ethene }}{\\mathrm{CH}_3 \\mathrm{CH}_3}\\)",
    "course": "AP",
    "subjectname": "CHEMISTRY",
    "chapter": "Alcohols Phenols and Ethers",
    "practice": "1. Preparation and Properties of Alcohols",
    "subtopic": null,
    "medium": "English",
    "difficulty": "Medium",
    "category": "7",
    "question_type": "MCQs"
  },
  {
    "questionid": 112265,
    "question": "Identify \\(A\\) and \\(B\\) in the following reaction<br>\\(\\mathrm{CH}_3-\\mathrm{CH}_3 \\stackrel{B}{\\longleftarrow} \\mathrm{CH}_3 \\mathrm{COOH} \\stackrel{A}{\\longrightarrow} \\mathrm{CH}_3 \\mathrm{CH}_2 \\mathrm{OH}\\)<br>\\(\\text { A } \\quad \\text { B }\\)",
    "option1": "\\(\\mathrm{HI}+\\) red \\(\\mathrm{P} \\quad \\mathrm{LiAlH}_4\\)",
    "option2": "\\(\\mathrm{Ni} \/ \\Delta \\quad \\mathrm{LiAlH}_4\\)",
    "option3": "\\(\\mathrm{LiAlH}_4 \\quad \\mathrm{HI}+\\) red P",
    "option4": "\\(\\mathrm{Pd}_{-\\mathrm{BaSO}_4} \\quad \\mathrm{Zn}+\\mathrm{HCl}\\)",
    "Answer": "3",
    "Explanation": "Acetic acid on reduction with lithium aluminiumhydride \\(\\left(\\mathrm{LiAlH}_4\\right)\\) gives ethyl alcohol while on reduction with \\(\\mathrm{HI}\\) and red \\(\\mathrm{P}\\) gives ethane.<br>\\[<br>\\mathrm{CH}_3 \\mathrm{COOH} \\stackrel{\\mathrm{LiAlH}_4}{\\longrightarrow} \\mathrm{CH}_3 \\mathrm{CH}_2 \\mathrm{OH}<br>\\]<br>ethyl alcohol<br>\\[<br>\\mathrm{CH}_3 \\mathrm{COOH} \\stackrel{\\text { Red P }+\\mathrm{HI}}{\\longrightarrow} \\mathrm{CH}_3-\\mathrm{CH}_3<br>\\]<br>Hence, reagent \\(A\\) and \\(B\\) are respectively \\(\\mathrm{LiAlH}_4\\) and \\(\\mathrm{HI} \/\\) red P.",
    "course": "AP",
    "subjectname": "CHEMISTRY",
    "chapter": "Alcohols Phenols and Ethers",
    "practice": "1. Preparation and Properties of Alcohols",
    "subtopic": null,
    "medium": "English",
    "difficulty": "Medium",
    "category": "7",
    "question_type": "MCQs"
  },
]

const ChemistryData = (props: ChemistryDataProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = data[currentQuestionIndex];

  // MathJax configuration
  // const mathJaxOptions = {
  //   messageStyle: "none",
  //   extensions: ["tex2jax.js"],
  //   jax: ["input/TeX", "output/HTML-CSS"],
  //   tex2jax: {
  //     inlineMath: [['$', '$'], ['\\(', '\\)']],
  //     displayMath: [['$$', '$$'], ['\\[', '\\]']],
  //     processEscapes: true,
  //   },
  //   TeX: {
  //     extensions: [
  //       "AMSmath.js",
  //       "AMSsymbols.js",
  //       "noErrors.js",
  //       "noUndefined.js",
  //     ]
  //   }
  // };
  const mathJaxOptions = {
    // HTML content with MathJax support
    // html={'$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$<br><p>This is an equation</p>'}
    // MathJax config option
    messageStyle: 'none',
    // mathJaxOptions={
      extensions: ['tex2jax.js'],
      jax: ['input/TeX', 'output/HTML-CSS'],
      tex2jax: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
      },
      TeX: {
        extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js']
      }
    // }
  // {...WebView props}
  }


  // Function to render mixed content (HTML + MathJax)
  const renderMixedContent = (content) => {
    if (!content) return null;

    // Check if content contains images (HTML img tags)
    if (content.includes('<img')) {
      return (
        <RenderHtml
          source={{ html: content }}
          contentWidth={width - 40}
          tagsStyles={{
            img: {
              maxWidth: 500, // 250
              height: 300, // 150
              resizeMode: 'contain'
            },
            p: {
              fontSize: moderateScale(16),
              color: 'red',
              lineHeight: 22
            }
          }}
        />
      );
    }

    // Check if content contains MathJax
    if (content.includes('\\(') || content.includes('\\(.*?\\)')) {
      return (
        <MathJax
          html={content}
          mathJaxOptions={mathJaxOptions}
          style={styles.mathContent}
        />
      );
    }

    // Plain text
    return <Text style={styles.textContent}>{content}</Text>;
  };

  const handleOptionSelect = (optionKey) => {
    setSelectedOption(optionKey); 
    // Check if answer is correct 
    if (optionKey === currentQuestion.Answer) { 
      setScore(prev => prev + 1);
      Alert.alert("Correct!", "Well done!") 
    } else {
      Alert.alert("Incorrect", `The correct answer is option ${currentQuestion.Answer}`);
    }
    // Show explanation
    setShowExplanation(true);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      Alert.alert(
        "Quiz Complete",
        `Your score: ${score}/${data.length}`,
        [{
          text: "OK", onPress: () => {
            setCurrentQuestionIndex(0);
            setScore(0);
            setSelectedOption(null);
            setShowExplanation(false);
          }
        }]
      );
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={`Chemistry Quiz (${currentQuestionIndex + 1}/${data.length})`}
        onBackPress={() => props.navigation?.goBack()}
      />

      <ScrollView style={styles.scrollContainer}>
        {/* Question Header */}
        <View style={styles.questionHeader}>
          <Text style={styles.questionNumber}>
            Question {currentQuestionIndex + 1} of {data.length}
          </Text>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>

        {/* Difficulty and Category */}
        <View style={styles.metaInfo}>
          <Text style={styles.metaText}>
            Difficulty: {currentQuestion.difficulty}
          </Text>
          <Text style={styles.metaText}>
            Chapter: {currentQuestion.chapter}
          </Text>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.sectionTitle}>Question:</Text>
          {renderMixedContent(currentQuestion.question)}
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>Options:</Text>

          {['1', '2', '3', '4'].map((optionKey, index) => {
            const optionText = currentQuestion[`option${optionKey}`];
            const isSelected = selectedOption === optionKey;
            const isCorrect = currentQuestion.Answer === optionKey;
            return (
              <TouchableOpacity
                key={optionKey}
                style={[
                  styles.optionButton,
                  isSelected && styles.selectedOption,
                  isSelected && isCorrect && styles.correctOption,
                  isSelected && !isCorrect && styles.wrongOption,
                ]}
                onPress={() => !selectedOption && handleOptionSelect(optionKey)}
                disabled={!!selectedOption}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionLetter}>
                    {String.fromCharCode(65 + index)}.
                  </Text>
                  <View style={styles.optionTextContainer}>
                    {renderMixedContent(optionText)}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Explanation (show when answer selected) */}
        {showExplanation && currentQuestion.Explanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.sectionTitle}>Explanation:</Text>
            {renderMixedContent(currentQuestion.Explanation)}
          </View>
        )}

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentQuestionIndex === 0 && styles.disabledButton
            ]}
            onPress={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={goToNextQuestion}>
            <Text style={styles.navButtonText}>
              {currentQuestionIndex === data.length - 1 ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
    padding: moderateScale(16),
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(16),
    paddingBottom: moderateScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  questionNumber: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#333',
  },
  scoreText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#2E7D32',
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(16),
    padding: moderateScale(10),
    backgroundColor: '#e8f5e9',
    borderRadius: moderateScale(8),
  },
  metaText: {
    fontSize: moderateScale(14),
    color: '#388E3C',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#1a237e',
    marginBottom: moderateScale(8),
  },
  questionContainer: {
    backgroundColor: 'white',
    padding: moderateScale(16),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(20),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textContent: {
    fontSize: moderateScale(16),
    color: '#000',
    lineHeight: moderateScale(22),
  },
  mathContent: {
    fontSize: moderateScale(16),
    color: '#000',
    lineHeight: moderateScale(22),
  },
  optionsContainer: {
    marginBottom: moderateScale(20),
  },
  optionButton: {
    backgroundColor: 'white',
    padding: moderateScale(14),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 1,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  correctOption: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4CAF50',
  },
  wrongOption: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  optionLetter: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#1a237e',
    marginRight: moderateScale(8),
    minWidth: moderateScale(24),
  },
  optionTextContainer: {
    flex: 1,
  },
  explanationContainer: {
    backgroundColor: '#fffde7',
    padding: moderateScale(16),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(20),
    borderLeftWidth: moderateScale(4),
    borderLeftColor: '#ffd600',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  navButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(8),
    minWidth: moderateScale(120),
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#b0bec5',
  },
  navButtonText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default ChemistryData;